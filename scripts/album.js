/*
var createSongRow = function(songNumber, songName, songLength) {

  var template =
    '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + (songNumber+1) +'</td>'
    + '  <td class="song-item-title">' + songName + '</td>'
    + '  <td class="song-item-duration">' + songLength + '</td>'
    +'</tr>'
    ;
  var $row = $(template);
*/
  var clickHandler = function() {

    var songNumber = parseInt($(this).attr('data-song-number'));

    if(currentlyPlayingSongNumber !== null) {

      var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
      currentlyPlayingCell.html(currentlyPlayingSongNumber);
    } 
    if (currentlyPlayingSongNumber !== songNumber) {
      
      setSong(songNumber);
        currentSoundFile.play();
        updateSeekBarWhileSongsPlays();
        
        var $volumeFill = $('.volume .fill');
        var $volumeThumb = $('.volume .thumb');
        $volumeFill.width(currentVolume + '%');
        $volumeThumb.css({left: currentVolume + '%'});
        
        updatePlayerBarSong();
        $(this).html(pauseButtonTemplate);
    }
    else if (currentlyPlayingSongNumber === songNumber) {
        if (currentSoundFile.isPaused()) {  
      $(this).html(pauseButtonTemplate);
      $('.left-controls .play-pause').html(playerBarPauseButton);
      currentSoundFile.play();
    } else {
        $(this).html(playButtonTemplate);
      $('.left-controls .play-pause').html(playerBarPlayButton);
        currentSoundFile.pause();
    }
    }
  };

  var onHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = songNumberCell.attr('data-song-number');

    if (songNumber !== currentlyPlayingSongNumber) {
      songNumberCell.html(playButtonTemplate);
    }
  };

  var offHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = parseInt($(this).attr('data-song-number'));

    if (songNumber !== currentlyPlayingSongNumber) {
      songNumberCell.html(songNumber);
    }
  };

  $row.find('.song-item-number').click(clickHandler);
  $row.hover(onHover, offHover);
  return $row;
};

/*
var setCurrentAlbum = function(album) {

  currentAlbum = album;

  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');


  $albumTitle.text(album.name);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);
  $albumSongList.empty();

  for (i = 0; i<album.songs.length; i++) {
    var $newRow = createSongRow(i, album.songs[i].name, album.songs[i].length);
    $albumSongList.append($newRow);
  }
};
*/

/*
var setCurrentTimeInPlayerBar = function() {

    var $currentTime = $('.seek-control .current-time');    
    
    if(currentSoundFile) {
    
    currentSoundFile.bind('timeupdate', function(event) {
        myTime = this.getTime();
        $currentTime.text(filterTimeCode(myTime));
    });
         
};
    
};
    
var setTotalTimeInPlayerBar = function(){
    var $totalTime = $('.seek-control .total-time');
    
    if(currentSoundFile) {
        
        currentSoundFile.bind('timeupdate', function(event) {
            myTime = this.getDuration();
            
            $totalTime.text(filterTimeCode(myTime));
    });
};
};

var filterTimeCode = function(timeInSeconds) {

var time = parseFloat(timeInSeconds);
var sec = parseInt(time);
var min = 0;
    while(sec>59) { sec -=60 ; min ++;}
    

        return min+':'+ sec;
};

 */

var updateSeekBarWhileSongsPlays = function() {

    if(currentSoundFile) {
    
    currentSoundFile.bind('timeupdate', function(event) {
        var seekBarFillRatio = this.getTime() / this.getDuration();
        var $seekBar = $('.seek-control .seek-bar');
        
        updateSeekPercentage($seekBar, seekBarFillRatio);
        setCurrentTimeInPlayerBar();
    });
    
    }   
};

            
            
var updateSeekPercentage = function($seekBar, seekBarFillRatio) {

    var offsetXPercent = seekBarFillRatio * 100;
    
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(100, offsetXPercent);
    
    var percentageString = offsetXPercent + '%';
    $seekBar.find('.fill').width(percentageString);
    $seekBar.find('.thumb').css({left: percentageString});
    
};

var setupSeekBars = function() {
    var $seekBars = $('.player-bar .seek-bar');
    
    $seekBars.click(function(event) {
        
        var offsetX = event.pageX - $(this).offset().left;
        var barWidth = $(this).width();
        
        var seekBarFillRatio = offsetX / barWidth;
        
        if ($(this).parent().attr('class') == 'seek-control') {
            seek(seekBarFillRatio * currentSoundFile.getDuration());
        } else {
            setVolume(seekBarFillRatio * 100);
        }
        
        updateSeekPercentage($(this), seekBarFillRatio);
        
    });
    
    $seekBars.find('.thumb').mousedown(function(event) {
    
        var $seekBar = $(this).parent();
        
        $(document).bind('mousemove.thumb', function(event) {
            var offsetX = event.pageX - $seekBar.offset().left;
            var barWidth = $seekBar.width();
            var seekBarFillRatio = offsetX / barWidth;
            
            if ($seekBar.parent().attr('class') == 'seek-control') {
                seek(seekBarFillRatio * currentSoundFile.getDuration());
            } else {
                setVolume(seekBarFillRatio);
            }
            
            
            updateSeekPercentage($seekBar, seekBarFillRatio);
        });
        
        $(document).bind('mouseup.thumb', function() {
            $(document).unbind('mousemove.thumb');
            $(document).unbind('mouseup.thumb');
        
        });
    
    
    });
   
};

/*
var trackIndex = function(album, song) {
  return album.songs.indexOf(song);
};

var setSong = function(songNumber) {
    
    if (currentSoundFile) {
        currentSoundFile.stop();
    }

  currentlyPlayingSongNumber = parseInt(songNumber);
  currentSongFromAlbum = currentAlbum.songs[songNumber];
    
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
        formats: ['mp3'],
        preload: true
    });
    setVolume(currentVolume);
};
*/

var seek = function(time) {

    if(currentSoundFile) {
        currentSoundFile.setTime(time);
    }
};

var setVolume = function(volume) {
    
    if (currentSoundFile) {
        currentSoundFile.setVolume(volume);
    }
};
    
var getSongNumberCell = function(number) {

  return $('.song-item-number[data-song-number="' + number + '"]');

};

/*
var togglePlayFromPlayerBar = function() {
    
    
    if(currentSoundFile) {
        
    $(this).innerHTML = pauseButtonTemplate;
     $('.left-controls .play-pause').html(playerBarPlayButton);
     currentSoundFile.stop();
        
    } else {
    $(this).innerHTML = playButtonTemplate;
    $('.left-controls .play-pause').html(playerBarPauseButton);
    currentSoundFile.play();
    }
    
};

var nextSong = function() {

  var getLastSongNumber = function(index) {
    return index == 0 ? currentAlbum.songs.length : index;
  };

  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  currentSongIndex++;

  if (currentSongIndex >= currentAlbum.songs.length) {
    currentSongIndex = 0;
  }

  setSong(currentSongIndex);
    currentSoundFile.play();
  updatePlayerBarSong();

  var lastSongNumber = getLastSongNumber(currentSongIndex);
  var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
  var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

  $nextSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);

};

var previousSong = function() {

  var getLastSongNumber = function(index) {
    return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
  };

  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  currentSongIndex--;

  if (currentSongIndex < 0) {
    currentSongIndex = currentAlbum.songs.length - 1;
  }

  setSong(currentSongIndex);
    currentSoundFile.play();
  updatePlayerBarSong();

  var lastSongNumber = getLastSongNumber(currentSongIndex);
  var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
  var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

  $previousSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);

};

*/
var updatePlayerBarSong = function() {

  $('.currently-playing .song-name').text(currentSongFromAlbum.name);
  $('.currently-playing .artist-name').text(currentAlbum.name);
  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " +currentAlbum.name);  
  $('.left-controls .play-pause').html(playerBarPauseButton);
  setTotalTimeInPlayerBar();
};

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';
var currentVolume = 80;
var $previousButton = $('.left-controls .previous');
var $nextButton = $('.left-controls .next');
var $current = $('.left-controls .play-pause');
$(document).ready(function() {           

  setCurrentAlbum(albumPicasso);
  setupSeekBars();
    
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
$current.click(togglePlayFromPlayerBar);
});

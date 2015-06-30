myAppModule.service('MusicPlayer', function() {
  var currentlyPlayingSongNumber;

  var currentAlbum = {
    name: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'pepa',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
    { 
      name: 'Blue',
      length: '4:26',
      audioUrl: '/assets/music/blue' 
    },
    { 
      name: 'Green',
      length: '3:14', 
      audioUrl: '/assets/music/green'
    },
      { 
        name: 'Red',
        length: '5:01',
        audioUrl: '/assets/music/red' 
      },
      { 
        name: 'Pink',
        length: '3:21',
        audioUrl: '/assets/music/pink'
      },
        { 
          name: 'Magenta',
          length: '2:15',
          audioUrl: '/assets/music/magenta'
        }
    ]
  };

  return {
    currentAlbum: currentAlbum,
    currentSoundFile: null,
    volume: 80,
    currentSong: null,
    listeners: [],
    play: function() {

      this.currentSoundFile.play();
    },
    pause: function() {

      this.currentSoundFile.pause();
    },
    setSong: function(songNumber) {

      if (this.currentSoundFile) {
        this.currentSoundFile.stop();
      }

      this.songNumber = songNumber;
      this.currentSong = this.currentAlbum.songs[this.songNumber];
      currentlyPlayingSongNumber = parseInt(songNumber);
      currentSongFromAlbum = currentAlbum.songs[songNumber];

      var self = this;
      if (this.currentSoundFile !== null){
        this.listeners.forEach(function(listener){
          self.currentSoundFile.unbind(listener[0], listener[1]);
        });
      }

      this.currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl,                {
        formats: ['mp3'],
        preload: true
      });
      this.currentSoundFile.setVolume(this.volume);
      this.currentSoundFile.play();

      this.listeners.forEach(function(listener){
        self.currentSoundFile.bind(listener[0], listener[1]);
      });
    },

    setVolume: function(volume) {
      if (this.currentSoundFile) {
        this.currentSoundFile.setVolume(volume);
      }
      this.volume = volume;
    },
    next: function() {

      var currentTrack = this.songNumber ;

      if (this.currentSoundFile) {
        this.currentSoundFile.stop();
      }
      currentTrack++;

      if (currentTrack >= currentAlbum.songs.length) {
        currentTrack = 0;
      }
      this.setSong(currentTrack);
    },
    previous: function() {
      var currentTrack = this.songNumber ;
      if (this.currentSoundFile) {
        this.currentSoundFile.stop();
      }
      currentTrack--;

      if (currentTrack < 0) {
        currentTrack = currentAlbum.songs.length - 1;
      }
      this.setSong(currentTrack);
    },

    addListener: function(eventName, fn){
      this.listeners.push([eventName, fn]);
    }
  }

});

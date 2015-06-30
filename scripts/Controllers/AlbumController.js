myAppModule.controller('AlbumController', ['$scope', 'MusicPlayer', function($scope, MusicPlayer) {
         
    $scope.totalTime = '-:--';
    $scope.currentTime = '-:--';
    $scope.album = MusicPlayer.currentAlbum;
    $scope.player = MusicPlayer;
       
    $scope.mouseOver = function($event) {
        var td = $event.target;
        $(td).find('div').hide();
        $(td).find('a').show();
        $(td).find('.ion-play').show();
        $(td).find('.ion-pause').hide();
    };
    
    $scope.mouseLeave = function($event) {
        var td = $event.target;
        $(td).find('div').show();
        $(td).find('a').hide();
        
    };
    
    $scope.play = function(songNumber) {
        if(songNumber >= 0) {
        MusicPlayer.setSong(songNumber);
       MusicPlayer.currentSoundFile.bind('timeupdate', function(event) {
            var self = this;
        $scope.$apply(function(){
        $scope.totalTime = self.getDuration();
             });
        });
         MusicPlayer.currentSoundFile.bind('timeupdate', function(event) {
            var self = this;
            $scope.$apply(function() {
                $scope.currentTime = self.getTime();
                });
         }); 
        } else {
           MusicPlayer.play();
        }
        $scope.playing = true; 
                                         
 };
                                           
    $scope.pauseSong = function() {
        MusicPlayer.pause();
        $scope.playing = false;

    };   
    $scope.nextSong = function() {
        MusicPlayer.next();
        $scope.playing = true; 
        
        MusicPlayer.currentSoundFile.bind('timeupdate', function(event) {
            var self = this;
             $scope.$apply(function(){
                 $scope.totalTime = self.getDuration();
             });
        });
        MusicPlayer.currentSoundFile.bind('timeupdate', function(event) {
            var self = this;
            $scope.$apply(function() {
                $scope.currentTime = self.getTime();
                });
         });
    };
    $scope.previousSong = function() {
        MusicPlayer.previous(); 
        $scope.playing = true; 
          MusicPlayer.currentSoundFile.bind('timeupdate', function(event) {
            var self = this;
             $scope.$apply(function(){
                 $scope.totalTime = self.getDuration();
             });
         });
        MusicPlayer.currentSoundFile.bind('timeupdate', function(event) {
            var self = this;
            $scope.$apply(function() {
                $scope.currentTime = self.getTime();
                });
         });
    };
  
       
 }]);


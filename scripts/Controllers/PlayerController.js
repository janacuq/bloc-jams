myAppModule.controller('PlayerController', ['$scope', 'MusicPlayer', function ($scope, MusicPlayer) {

    $scope.volume = MusicPlayer.volume / 100;
    $scope.progress = MusicPlayer.getProgress();
    $scope.totalTime = '--:--';
    $scope.currentTime = '--:--';
    $scope.player = MusicPlayer;
    
    $scope.$on('myCustomEvent', function (event, data) {
  console.log(data.songNumber); // 'Data to send'
        $scope.play(data.songNumber);
});
    
    
  $scope.$watch('progress', function(newValue, oldValue, scope) {
    var file = MusicPlayer.currentSoundFile;
    if (file === null) return;
    var newPercent = newValue * 100;
    if(Math.abs(file.getPercent() - newPercent) > 1) file.setPercent(newPercent);
  });

  MusicPlayer.addListener('timeupdate', function (event) {
    $scope.$apply(function () {
      $scope.progress = MusicPlayer.getProgress();
    });
  });
    
    $scope.$watch('volume', function(newValue, oldValue, scope) {
        MusicPlayer.setVolume(newValue * 100);
    });
      
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
    
    
}]);

myAppModule.controller('PlayerController', ['$scope', 'MusicPlayer', function ($scope, MusicPlayer) {
  window.skope = $scope;
  console.log('player controller initialized');
  $scope.volume = MusicPlayer.volume / 100;
  $scope.progress = 0;

  $scope.$watch('progress', function(newValue, oldValue, scope) {
    var file = MusicPlayer.currentSoundFile;
    if (file === null) return;
    var newPercent = newValue * 100;
    if(Math.abs(file.getPercent() - newPercent) > 1) file.setPercent(newPercent);
  });

  MusicPlayer.addListener('timeupdate', function (event) {
    var self = this;
    $scope.$apply(function () {
      var newValue = self.getTime() / self.getDuration();
      $scope.progress = newValue;
    });
  });
    
    $scope.$watch('volume', function(newValue, oldValue, scope) {
        MusicPlayer.setVolume(newValue * 100);
    });
        
}]);

myAppModule.controller('PlayerController', ['$scope', 'MusicPlayer', function ($scope, MusicPlayer) {

     $scope.volume =


     $scope.progress = function () {

     
         MusicPlayer.currentSoundFile.bind('timeupdate', function (event) {
                 var self = this;
                 $scope.$apply(function () {
                     $scope.seekBarFillRatio = self.getTime() / self.getDutation();
                     return $scope.seekBarFillRatio
                 });
                 updateSeekPercentage($scope.seekBarFillRatio);
             });
          }
}]);







     

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
         $scope.$broadcast('myCustomEvent', {
        someProp: songNumber // send whatever you want
});
   
     };
  
  
       
 }]);


myAppModule.controller('LandingController', ['$scope', function($scope) {
              $scope.title = "Turn the music up!";       
    
    
                $scope.points = [
                    { icon: 'ion-music-note',
                     title: 'Choose your music',
                    description: 'The world is full of music; why should you have to listen to music that someone else chose?'
                    },
                    { icon: 'ion-radio-waves',
                     title: 'Unlimited, streaming, ad-free',
                    description: 'No arbitrary limits. No distraccions'
                    },
                    { icon: 'ion-iphone',
                     title: 'Mobile enabled',
                    description: 'Listen to your music on the go. This streaming service is available on all mobile platforms.'
                    }
                ];
    
    
    $scope.toogle = function(index) {
        $scope.points.sort(function(){
            return Math.round(Math.random()) - 0.5;
        });
 };
    
}]);
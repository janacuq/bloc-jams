var myAppModule = angular.module('myapp',['ui.router']);

myAppModule.config(['$stateProvider','$locationProvider', function($stateProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    
    $stateProvider.state('album', {
        url: '/album',
        controller: 'Album.controller',
        templateUrl: '/templates/album.html'
    });

    $stateProvider.state('landing', {
        url: '/landing',
        controller: 'Landing.controller',
        templateUrl: '/templates/landing.html'
    });
    
    $stateProvider.state('collection', {
        url: '/collection',
        controller: 'Collection.controller',
        templateUrl: '/templates/collection.html'
    });
}]);();


myAppModule.controller('Landing.controller', ['$scope', function($scope) {
        $scope.subText = 'Turn up music';
    
    };
}]);
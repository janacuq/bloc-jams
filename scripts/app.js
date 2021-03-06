var myAppModule = angular.module('myApp', ['ui.router']);

myAppModule.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/landing');
    
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    
    $stateProvider.state('landing', {
        url: '/landing',
        controller: 'LandingController',
        templateUrl: '/templates/landing.html'
    });
    $stateProvider.state('album', {
        url: '/album',
        controller: 'AlbumController',
        templateUrl: '/templates/album.html'
    });
    $stateProvider.state('collection', {
        url: '/collection',
        controller: 'CollectionController',
        templateUrl: '/templates/collection.html'
    });
    
    
}]);

myAppModule.filter('timeCode', function() {
    
    return function(x) {
        
        var time = parseFloat(x);
        var sec = parseInt(time);
        var min = 0;
        while(sec>59) { sec -=60 ; min ++;}
        
        if(isNaN(sec)){
            return '--:--'
        } else {
        return min+':'+ sec;
        }
        };
    
});
var myAppModule = angular.module('myApp', ['ui.router']);

myAppModule.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
    
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    
    $stateProvider.state('landing', {
        url: '/landing',
        controller: 'Landing.controller',
        temlplateUrl: '/templates/landing.html'
    });
    $stateProvider.state('album', {
        url: '/album',
        controller: 'Album.controller',
        temlplateUrl: '/templates/album.html'
    });
    $stateProvider.state('collection', {
        url: '/collection',
        controller: 'Collection.controller',
        temlplateUrl: '/templates/collection.html'
    });
    
}]);
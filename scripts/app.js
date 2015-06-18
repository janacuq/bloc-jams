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

var albumPicasso = {
    name: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { name: 'Blue', length: '4:26', audioUrl: '/assets/music/blue' },
        { name: 'Green', length: '3:14', audioUrl: '/assets/music/green' },
        { name: 'Red', length: '5:01', audioUrl: '/assets/music/red' },
        { name: 'Pink', length: '3:21', audioUrl: '/assets/music/pink'},
        { name: 'Magenta', length: '2:15', audioUrl: '/assets/music/magenta'}
        
    ]
};
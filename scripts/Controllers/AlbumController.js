myAppModule.controller('AlbumController', ['$scope', function($scope) {
         
        $scope.album = {
            name: 'The Colors',
            artist: 'Pablo Picasso',
            label: 'pepa',
            year: '1881',
            albumArtUrl: 'assets/images/album_covers/01.png',
            songs: [
        { 
        name: 'Blue',
        length: '4:26',
        audioUrl: '/assets/music/blue' 
        },
        { 
        name: 'Green',
        length: '3:14', 
        audioUrl: '/assets/music/green'
        },
        { 
         name: 'Red',
         length: '5:01',
         audioUrl: '/assets/music/red' 
        },
        { 
        name: 'Pink',
        length: '3:21',
        audioUrl: '/assets/music/pink'
        },
        { 
        name: 'Magenta',
        length: '2:15',
        audioUrl: '/assets/music/magenta'
        }
        
    ]
           
};
    
    
 }]);
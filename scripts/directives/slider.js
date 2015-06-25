   myAppModule.directive('mySlider', ['MusicPlayer', function (MusicPlayer) {
       return {
           restrict: 'E',
           scope: {},
           templateUrl: 'scripts/directives/slider.html',
           link: function (scope, element, attributes) {


               var updateSeekPercentage = function (element, event) {

                   var set = event.pageX - element.offset.left;
                   var barWidth = element.width();
                   var seekBarFillRatio = set / barWidth;

                   var offsetXPercent = seekBarFillRatio * 100;

                   offsetXPercent = Math.max(0, offsetXPercent);
                   offsetXPercent = Math.min(100, offsetXPercent);

                   return offsetXPercent + '%';

               };

           }


            scope.seekFillRatio = function ($event) {
                updateSeekPercentage(element, event);
           };

           scope.fillStyle = function () {
               return {
                   width: updateSeekPercentage()
               };
           }

           scope.thumbStyle = function () {
               return {
                   left: updateSeekPercentage()
               };
           }

       }
   }]);

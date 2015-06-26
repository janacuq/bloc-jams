   myAppModule.directive('mySlider', ['MusicPlayer', function (MusicPlayer) {
       return {
           restrict: 'E',
           scope: {},
           templateUrl: 'scripts/directives/slider.html',
           link: function (scope, element, attributes) {

               var $element = $('.seek-bar')
               var updateSeekPercentage = function (seekBarFillRatio) {
                   var offsetXPercent = seekBarFillRatio * 100;
                   offsetXPercent = Math.max(0, offsetXPercent);
                   offsetXPercent = Math.min(100, offsetXPercent);

                   return offsetXPercent + '%';

               };

               scope.seekFillRatio = function (event) {
                   var set = event.pageX - $element.offset().left;
                   var barWidth = $element.width();
                   var seekBarFillRatio = set / barWidth;
                   
                   return updateSeekPercentage(seekBarFillRatio);

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
               scope.press = function(e) {
                 var percentageString = scope.seekFillRatio(e);
                 $element.find('.fill').width(percentageString);
                 $element.find('.thumb').css({left: percentageString});
               }

               scope.mousedown = function(event) {
                 event.preventDefault();
                 $(document).on('mousemove', scope.press);
                 $(document).on('mouseup', scope.mouseup);
               };

               scope.mouseup = function() {
                 $(document).off('mousemove', scope.press);
                 $(document).off('mouseup', scope.mouseup);
               };
           }
       }
   }]);

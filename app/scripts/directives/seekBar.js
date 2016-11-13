(function() {
  function seekBar($document) {

    var calculatePercent = function(seekBar, event) {
      var offsetX = event.pageX - seekBar.offset().left;
      var seekBarWidth = seekBar.width();
      var offsetXPercent = offsetX / seekBarWidth;
      offsetXPercent = Math.max(0, offsetXPercent);
      offsetXPercent = Math.min(1, offsetXPercent);
      return offsetXPercent;
    };

    return {
      templateUrl: '/templates/directives/seek_bar.html',
      replace: true,
      restrict: 'E',
      scope: { },
      link: function(scope, element, attributes) {
        scope.value = 0;
        scope.max = 100;

        var seekBar = $(element);

        // private functions

        /**
        *@desc returns a number that fluctuates according to the values of value and max
        *@type private
        */

        var percentString = function () {
          var value = scope.value;
          var max = scope.max;
          var percent = value / max * 100;
          return percent + '%';
        };

        //public functions

        /**
        *@desc fills the html element (seek-bar) according to the percentage returned by fillstyle()
        *@type public
        */
        scope.fillStyle = function() {
          return { width: percentString() };
        };

        scope.thumbStyle = function() {
          return { left: percentString() };
        };

        scope.onClickSeekBar = function(event) {
          var percent = calculatePercent(seekBar, event);
          scope.value = percent * scope.max;
        };

        scope.trackThumb = function() {
          $document.bind('mousemove.thumb', function(event) {
            var percent = calculatePercent(seekBar, event);
            scope.$apply(function() {
              scope.value = percent * scope.max;
            });
          });

          $document.bind('mouseup.thumb', function() {
            $document.unbind('mousemove.thumb');
            $document.unbind('mouseup.thumb');
          });
        }; // end of trackThumb method
      } // end of link method
    }
  }
  angular
  .module('blocJams')
  .directive('seekBar', ['$document', seekBar]);
})();

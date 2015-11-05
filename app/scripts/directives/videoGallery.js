(function () {
  'use strict';
  angular.module('youTubeV2App')
  .directive('videoGallery', function () {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'views/video_gallery.html',
      link: function() {
      }
    };
  });

})();

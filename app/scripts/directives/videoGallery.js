(function () {
  'use strict';
  angular.module('youTubeV2App')
  .directive('videoGallery', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/video_gallery.html',
    };
  });

})();

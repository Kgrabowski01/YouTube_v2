'use strict';

angular.module('youTubeV2App')
.filter('startFrom', function() {
  return function(input, start) {
    start = +start;
    return input.slice(start);
  };
});

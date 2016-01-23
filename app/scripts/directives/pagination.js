(function(){
  'use strict';
  angular.module('youTubeV2App')

  .directive('pagination', function (paginationService) {

    var controller = function () {
    }
    return {
      controller:controller,
      controllerAs:'ctrl',
      bindToController: {
        bindPage:'=',
        bindSize:'=',
        bindSetSize:'=',
        bindPageNumbers: '=',
        bindMovieList: '='
      },
      scope: {},
      restrict: 'E',
      templateUrl: 'views/pagination.html'
    };
  });

})();

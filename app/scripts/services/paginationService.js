(function(){
  'use strict';
  angular.module('youTubeV2App')

  .factory('paginationService', paginationService);
  paginationService.$inject = [];

  function paginationService () {

    var pageSize = 2;
    var currentPage = 0;
    var numberOfPages = 0;

    function setNumberOfPages (source) {
      return Math.ceil(source.length / pageSize);
    }

    function setPageSize (size) {
      pageSize = size;
      console.log(pageSize)
    }

    return {
      setPageSize: setPageSize,
      setNumberOfPages: setNumberOfPages,
      pageSize: pageSize,
      currentPage: currentPage
    };

  }
})();

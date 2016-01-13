'use strict';

angular.module('youTubeV2App')
.controller('paginationCtrl', function ($scope, localStorageService, paginationService) {

  var vm = this;
  vm.movieList = localStorageService.filesArrayLength || 0 //paginationService.movieListLenght || 1;
  vm.setPageSize = setPageSize;
  vm.numberOfPages = numberOfPages ;
  vm.currentPage = 0 //paginationService.currentPage;
  vm.pageSize = 5 //paginationService.pageSize;


  function numberOfPages () {
    if (vm.movieList === 0) {return 1}
    return Math.ceil(vm.movieList / vm.pageSize);
  }

  function setPageSize (size) {
    vm.pageSize  = size;
    vm.currentPage = 0;
  }

});

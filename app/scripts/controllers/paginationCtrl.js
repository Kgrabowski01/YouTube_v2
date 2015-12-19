'use strict';

angular.module('youTubeV2App')
.controller('paginationCtrl', function ($scope, localStorageService) {

  var vm = this;

  vm.movieListt = localStorageService.filesArray || [];
  vm.setPageSize = setPageSize;
  vm.currentPage = 0;
  vm.pageSize = 5;
  vm.numberOfPages = function () {
    return Math.ceil(vm.movieListt.length / vm.pageSize);
  };

  function setPageSize (size) {
    vm.pageSize = size;
    vm.currentPage = 0;
   }


});

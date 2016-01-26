'use strict';

angular.module('youTubeV2App')
.controller('paginationCtrl', function (moviesStorage) {

  var vm = this;
  vm.movieList = moviesStorage.getAllMovies() || 0;
  vm.setPageSize = setPageSize;
  vm.numberOfPages = numberOfPages ;
  vm.currentPage = 0;
  vm.pageSize = 5;

  function numberOfPages () {
    if (vm.movieList === 0) {return 1;}
    return Math.ceil(vm.movieList.length / vm.pageSize);
  }

  function setPageSize (size) {
    vm.pageSize  = size;
    vm.currentPage = 0;
  }

});

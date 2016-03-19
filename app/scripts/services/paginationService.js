// (function(){
//   'use strict';
//   angular.module('youTubeV2App')
//
//   .factory('paginationService', paginationService);
//   paginationService.$inject = ['localStorageService'];
//
//   function paginationService (localStorageService) {
//
//     var pageSize = 5;
//     var currentPage = 0;
//     var numberOfPages = 0;
//     var movieListLenght = localStorageService.filesArrayLength
//
//     function setNumberOfPages () {
//       return Math.ceil(movieListLenght / pageSize);
//     }
//
//     function setPageSize (size) {
//       pageSize = size;
//       console.log(pageSize)
//     }
//
//     return {
//       movieListLenght: movieListLenght,
//       setPageSize: setPageSize,
//       setNumberOfPages: setNumberOfPages,
//       pageSize: pageSize,
//       currentPage: currentPage
//     };
//
//   }
// })();



// (function(){
//   'use strict';
//   angular.module('youTubeV2App')
//
//   .factory('paginationService', paginationService);
//   paginationService.$inject = ['localStorageService'];
//
//   function paginationService (localStorageService) {
//
//     var pageSize = 1;
//     var currentPage = 0;
//     var numberOfPages = 0;
//     var movieList = localStorageService.filesArray || [];
//
//     function setNumberOfPages () {
//       return Math.ceil(movieList.length / pageSize);
//     }
//
//     function setPageSize (size) {
//       pageSize = size;
//       console.log(pageSize)
//     }
//
//     return {
//       movieList: movieList,
//       setPageSize: setPageSize,
//       setNumberOfPages: setNumberOfPages,
//       pageSize: pageSize,
//       currentPage: currentPage
//     };
//
//   }
// })();

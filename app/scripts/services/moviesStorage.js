(function () {
  'use strict';

  angular.module('youTubeV2App')
  .factory('moviesStorage', moviesStorage);
  moviesStorage.$inject = ['localStorageService'];
  function moviesStorage (localStorageService) {

    var fileArray = localStorageService.filesArray || [];

    function pushNewMovie (movie) {
      fileArray.push(movie);
      localStorageService.toDataUlrArray (fileArray);
    }

    function pushToStorage (data) {
      localStorageService.toDataUlrArray (data);
    }

    function getAllMovies() {
      var movies = fileArray;
      return movies;
    }


    return {
      getAllMovies: getAllMovies,
      pushNewMovie: pushNewMovie,
      pushToStorage: pushToStorage
    };

  }

})();

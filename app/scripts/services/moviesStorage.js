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

    function pushNewComment (movieObj, fileID) {
      var movieArray = fileArray;
      for (var i = 0; i < movieArray.length; i++) {
        if (movieArray[i].movieID === fileID) {
          var tempComments = movieArray[i].userComments;
          tempComments.push(movieObj);
          movieArray[i].userComments = tempComments;
          pushToStorage(movieArray);
        }
      }
    }

    function getAllMovies() {
      var movies = fileArray;
      return movies;
    }

    return {
      getAllMovies: getAllMovies,
      pushNewMovie: pushNewMovie,
      pushToStorage: pushToStorage,
      pushNewComment: pushNewComment
    };

  }

})();

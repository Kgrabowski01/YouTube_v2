'use strict';

angular.module('youTubeV2App')
.controller('MainCtrl', function ($scope, $sce, movieProcService, localStorageService) {

  var vm = this;
  vm.movieList = localStorageService.filesArray || [];
console.log (vm.movieList)
  vm.AddMovie = function () {
    var videoID;
    if (movieProcService.sourceVimeo(vm.newMovie) == true) {
      videoID = vm.newMovie;
      movieProcService.getVimeoID(videoID)
      .then(function (videoID) {
        if (movieProcService.ifExist (videoID, vm.movieList) == false ) {
          vm.movieList.push (new movieProcService.VimeoMovie (videoID));
          localStorageService.toDataUlrArray (vm.movieList);
        }
        vm.newMovie = "";
      });
    }
    movieProcService.getYoutubeID (vm.newMovie)
    .then(function (vidID) {
      videoID = vidID;
      return movieProcService.getMovieInfo (videoID)
    })
    .then(function (s) {
      console.log(s)
      if (movieProcService.ifExist (videoID, vm.movieList) == false ) {
        vm.movieList.push (new movieProcService.YoutubeMovie ( videoID, s[0].statistics.viewCount, s[0].statistics.likeCount, s[0].statistics.favoriteCount, s[0].statistics.dislikeCount, s[0].statistics.commentCount ));
        localStorageService.toDataUlrArray (vm.movieList);
      }
      vm.newMovie = "";
    });
  };

  vm.removeAll = function (){
    vm.movieList = [];
    localStorageService.toDataUlrArray (vm.movieList);
  };

  vm.removeVideo = function (movieID, index) {
    var removedItemArray;
    removedItemArray =  movieProcService.removeVideo (vm.movieList, movieID, index)
    localStorageService.toDataUlrArray (removedItemArray);
  };

  vm.trustSrc = function (src) { // Tu jest problem
    return $sce.trustAsResourceUrl(src);
  };

});

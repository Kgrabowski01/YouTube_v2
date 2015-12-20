'use strict';

angular.module('youTubeV2App')
.controller('MainCtrl', function ($scope, $sce, movieProcService, localStorageService) {

  var vm = this;
  vm.movieList = localStorageService.filesArray || [];
  vm.layout = 'list';

  vm.processMovie = processMovie;
  vm.favoriteProc = favoriteProc;
  vm.removeAll = removeAll;
  vm.removeVideo = removeVideo;
  vm.trustSrc = trustSrc;
  vm.changeView = changeView;

  angular.forEach(vm.movieList, function (property) {
    property.view = parseFloat(property.view);
    property.comment = parseFloat(property.comment);
    property.favorite = parseFloat(property.favorite);
    property.like = parseFloat(property.like);
  });


  function changeView (style) {
    vm.layout = style;
  }

  function processMovie () {
    if (movieProcService.sourceVimeo(vm.newMovie)) {vimeoProc();}
    ytProc();
  }

  function ytProc () {
    var videoID;
    var currentTime = movieProcService.getDate();
    movieProcService.getYoutubeID (vm.newMovie)
    .then(function (vidID) {
      videoID = vidID;
      return movieProcService.getMovieInfo (videoID);
    })
    .then(function (s) {
      if (movieProcService.ifExist (videoID, vm.movieList) == false ) {
        vm.movieList.push (new movieProcService.YoutubeMovie ( videoID, s[0].statistics.viewCount, s[0].statistics.likeCount, s[0].statistics.favoriteCount, s[0].statistics.dislikeCount, s[0].statistics.commentCount, currentTime ));
        localStorageService.toDataUlrArray (vm.movieList);
      }
      vm.newMovie = "";
    });
  }

  function vimeoProc () {
    var videoID;
    var currentTime = movieProcService.getDate();
    videoID = vm.newMovie;
    movieProcService.getVimeoID(videoID)
    .then(function (videoID) {
      if (movieProcService.ifExist (videoID, vm.movieList) == false ) {
        vm.movieList.push (new movieProcService.VimeoMovie (videoID, currentTime));
        localStorageService.toDataUlrArray (vm.movieList);
      }
      vm.newMovie = "";
    });
  }

  function favoriteProc (movieID, flag)  {
    var favArray;
    favArray = movieProcService.favoriteProc (vm.movieList, movieID, flag);
    localStorageService.toDataUlrArray (favArray);
  }

  function removeAll () {
    var user_choice = window.confirm('Really delete all movies?');
    if(user_choice==true) {
      vm.movieList = [];
      localStorageService.toDataUlrArray (vm.movieList);
    }
    return false;
  }

  function removeVideo (movieID, index) {
    var removedVideoArray;
    removedVideoArray =  movieProcService.removeVideo (vm.movieList, movieID, index);
    localStorageService.toDataUlrArray (removedVideoArray);
  }

  function trustSrc (src) { // Tu jest problem
    return $sce.trustAsResourceUrl(src);
  }

});

'use strict';

angular.module('youTubeV2App')
.controller('MainCtrl', function ($scope, $sce, movieCommon, youTubeProcessing, localStorageService) {

  var vm = this;
  vm.movieList = localStorageService.filesArray || [];
  vm.layout = 'list';

  vm.processMovie = processMovie;
  vm.favoriteProc = favoriteProc;
  vm.removeAll = removeAll;
  vm.removeVideo = removeVideo;
  vm.changeView = changeView;
  vm.loadExampleDB = loadExampleDB;

  movieCommon.parseMovieTable(vm.movieList);

  function loadExampleDB () {
    var db = movieCommon.exampleVideoDataBase;
    for (var i = 0; i < db.length; i++) {
      vm.newMovie = db[i];
      processMovie ();
    }
    vm.newMovie = '';
  }

  function changeView (style) {
    vm.layout = style;
  }

  function processMovie () {
    movieCommon.chceckSource(vm.newMovie)
    .then(function(newMovieObj) {
      vm.movieList.push(newMovieObj[0]);
      localStorageService.toDataUlrArray (vm.movieList);
    });
    vm.newMovie = "";
  }

  function favoriteProc (movieID, flag)  {
    var favArray;
    favArray = movieCommon.favoriteProc (vm.movieList, movieID, flag);
    localStorageService.toDataUlrArray (favArray);
  }

  function removeAll () {
    var userChoice = window.confirm('Really delete all?');
    if(userChoice === true) {
      vm.movieList = [];
      localStorageService.toDataUlrArray (vm.movieList);
    }
    return false;
  }

  function removeVideo (movieID, index) {
    var removedVideoArray;
    removedVideoArray =  movieCommon.removeVideo (vm.movieList, movieID, index);
    localStorageService.toDataUlrArray (removedVideoArray);
  }
});

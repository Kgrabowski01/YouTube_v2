'use strict';

angular.module('youTubeV2App')
.controller('MainCtrl', function (movieCommon, moviesStorage, youTubeProcessing, localStorageService) {



  var vm = this;
  vm.movieList = moviesStorage.getAllMovies();
  vm.layout = 'list';
  vm.testMain = new MainCtrl();
  movieCommon.parseMovieTable(vm.movieList);

  vm.processMovie = processMovie;
  vm.favoriteProc = favoriteProc;
  vm.removeAll = removeAll;
  vm.removeVideo = removeVideo;
  vm.changeView = changeView;
  vm.loadExampleDB = loadExampleDB;
// qwe
  function MainCtrl() {
    var dd = this;
    dd.dupa = "dupa";
    this.dupa2 = "dupa2";
  }

  MainCtrl.prototype.getInfo = function () {
    alert( dd.dupa + ' ' + vm.layout + ' ' + this.dupa2 + ' ' +' apple');
  };

  MainCtrl.prototype.processMovie = function processMovie () {
    movieCommon.chceckSource(vm.newMovie)
    .then(function(newMovieObj) {
      vm.movieList.push(newMovieObj[0]);
      localStorageService.toDataUlrArray (vm.movieList);
    });
    vm.newMovie = "";
  };

  MainCtrl.prototype.loadExampleDB = function loadExampleDB () {
    var db = movieCommon.exampleVideoDataBase;
    for (var i = 0; i < db.length; i++) {
      vm.newMovie = db[i];
      processMovie ();
    }
    vm.newMovie = '';
  };

  MainCtrl.prototype.changeView = function changeView (style) {
    vm.layout = style;
  };

  MainCtrl.prototype.favoriteProc = function favoriteProc (movieID, flag)  {
    var favArray = movieCommon.favoriteProc (vm.movieList, movieID, flag);
    localStorageService.toDataUlrArray (favArray);
  };

  MainCtrl.prototype.removeAll = function removeAll () {
    var userChoice = window.confirm('Really delete all?');
    if(userChoice === true) {
      vm.movieList = [];
      localStorageService.toDataUlrArray (vm.movieList);
    }
    return false;
  };

  MainCtrl.prototype.removeVideo = function removeVideo (movieID, index) {
    var removedVideoArray =  movieCommon.removeVideo (vm.movieList, movieID, index);
    localStorageService.toDataUlrArray (removedVideoArray);
  };


  function loadExampleDB () {
    var db = movieCommon.exampleVideoDataBase;
    for (var i = 0; i < db.length; i++) {
      processMovie (db[i]);
    }
  }

  function changeView (style) {
    vm.layout = style;
  }

  function processMovie (newInput) {
    movieCommon.processFile(newInput)
    .then(function(newMovieObj) {
      moviesStorage.pushNewMovie(newMovieObj[0]);
    });
    vm.newMovie = "";
  }

  function favoriteProc (movieID, flag)  {
    var favArray = movieCommon.favoriteProc (vm.movieList, movieID, flag);
    moviesStorage.pushToStorage (favArray);
  }

  function removeAll () {
    var userChoice = window.confirm('Really delete all?');
    if(userChoice === true) {
      vm.movieList = [];
      moviesStorage.pushToStorage (vm.movieList);
    }
    return false;
  }

  function removeVideo (movieID, index) {
    var removedVideoArray =  movieCommon.removeVideo (vm.movieList, movieID, index);
    moviesStorage.pushToStorage (removedVideoArray);
  }

});

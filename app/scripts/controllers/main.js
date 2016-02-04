'use strict';

angular.module('youTubeV2App')
.controller('MainCtrl', MainCtrl);
MainCtrl.$inject = ['movieCommon','moviesStorage'];

function MainCtrl (movieCommon, moviesStorage) {

  var vm = this;
  vm.movieList = moviesStorage.getAllMovies();
  vm.layout = 'list';
  vm.movieCommon = movieCommon;
  vm.moviesStorage = moviesStorage;

  movieCommon.parseMovieTable(vm.movieList);

}

  MainCtrl.prototype.processMovie = function processMovie (newInput) {
    var that = this;
    that.movieCommon.processFile(newInput)
    .then(function(newMovieObj) {
      that.moviesStorage.pushNewMovie(newMovieObj[0]);
    });
    that.newMovie = "";
  };

  MainCtrl.prototype.loadExampleDB = function loadExampleDB () {
    var that = this;
    var db = that.movieCommon.exampleVideoDataBase;
    for (var i = 0; i < db.length; i++) {
      that.processMovie (db[i]);
    }
  };

  MainCtrl.prototype.changeView = function changeView (style) {
    var that = this;
    that.layout = style;
  };

  MainCtrl.prototype.favoriteProc = function favoriteProc (movieID, flag)  {
    var that = this;
    var favArray = that.movieCommon.favoriteProc (that.movieList, movieID, flag);
    that.moviesStorage.pushToStorage (favArray);
  };

  MainCtrl.prototype.removeAll = function removeAll () {
    var that = this;
    var userChoice = window.confirm('Really delete all?');
    if(userChoice === true) {
      that.movieList = [];
      that.moviesStorage.pushToStorage (that.movieList);
    }
    return false;
  };

  MainCtrl.prototype.removeVideo = function removeVideo (movieID, index) {
    var that = this;
    var removedVideoArray =  that.movieCommon.removeVideo (that.movieList, movieID, index);
    that.moviesStorage.pushToStorage (removedVideoArray);
  };

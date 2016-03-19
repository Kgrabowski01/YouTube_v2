'use strict';

// angular.module('youTubeV2App')
// .controller('MainCtrl', MainCtrl);
// MainCtrl.$inject = ['movieCommon','moviesStorage'];

class MainCtrl {
  constructor () {
    var vm = this;
    vm.movieList = moviesStorage.getAllMovies();
    vm.layout = 'list';
    vm.movieCommon = movieCommon;
    vm.moviesStorage = moviesStorage;
    movieCommon.parseMovieTable(vm.movieList);
  }

  processMovie (newInput) {
    this.movieCommon.processFile(newInput)
    .then(newMovieObj => this.moviesStorage.pushNewMovie(newMovieObj[0]))
    this.newMovie = "";
  }

  loadExampleDB () {
    var db = this.movieCommon.exampleVideoDataBase;
    for (var i = 0; i < db.length; i++) {
      this.processMovie (db[i]);
    }
  };

  changeView (style) {
    this.layout = style;
  };

  favoriteProc (movieID, flag)  {
    let favArray = this.movieCommon.favoriteProc (this.movieList, movieID, flag);
    this.moviesStorage.pushToStorage (favArray);
  };

  removeAll () {
    var userChoice = window.confirm('Really delete all?');
    if(userChoice === true) {
      this.movieList = [];
      this.moviesStorage.pushToStorage (this.movieList);
    }
    return false;
  };

  removeVideo (movieID, index) {
    var removedVideoArray =  this.movieCommon.removeVideo (this.movieList, movieID, index);
    this.moviesStorage.pushToStorage (removedVideoArray);
  };

}

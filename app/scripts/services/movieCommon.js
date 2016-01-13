(function () {
  'use strict';

  angular.module('youTubeV2App')
  .factory('movieCommon', movieCommon);
  movieCommon.$inject = ['$q', '$http','$sce', '$filter', 'localStorageService' ,'youTubeProcessing', 'vimeoProcessing'];
  function movieCommon ($q, $http, $sce, $filter, localStorageService, youTubeProcessing, vimeoProcessing) {

    var NewMovie = function (movieId, viewCount, likeCount, commentCount, addTime, url, myFavorite) {
      var vm = this;
      vm.movieID = movieId;
      vm.view = viewCount;
      vm.like = likeCount;
      vm.comment = commentCount;
      vm.addTime = addTime;
      vm.url = url;
      vm.myFavorite = myFavorite || false;
    };

    function chceckSource (toCheck) { // ta funkcja mi sie nie podoba, chcialem zrobic cos w stylu automatycznego wyboru odpowiednich serwisow
      var def = $q.defer();
      var tempDate = getDate();
      var tempMovieArray = [];
      // var c = patternCheck(toCheck);
      // c.processMovie(toCheck)
      var source = toCheck;
      var sourceJson = JSON.stringify(source);
      var pattern = new RegExp("vimeo");
      var result = pattern.test(sourceJson);
      if (result == true) {
        vimeoProcessing.processMovie(toCheck)
        .then(function(property) {
          if (ifExist (property.movieID, localStorageService.filesArray) == false) {
            tempMovieArray.push(new NewMovie (property.movieID, property.view, property.like, property.comment, tempDate, property.url, property.myFavorite));
            def.resolve (tempMovieArray);
          }
        });
        return def.promise;
      }
      youTubeProcessing.processMovie(toCheck)
      .then(function(property) {
        if (ifExist (property.movieID, localStorageService.filesArray) == false) {
          tempMovieArray.push(new NewMovie (property.movieID, property.view, property.like, property.comment, tempDate, property.url, property.myFavorite));
          def.resolve (tempMovieArray);
        }
      });
      return def.promise;
    }

    // function patternCheck (toCheck) {
    //   var source = toCheck;
    //   var patternVimeo = 'vimeoProcessing';
    //   var patternYT = 'youTubeProcessing';
    //   var sourceJson = JSON.stringify(source);
    //   var pattern = new RegExp("vimeo");
    //   var result = pattern.test(sourceJson);
    //   if (result == true) { return patternVimeo; }
    //   return patternYT;
    // }


    function getDate () {
      var newDate = new Date();
      var filteredDate = $filter('date')( newDate, 'yyyy-MM-dd HH:mm:ss');
      return filteredDate;
    }

    function ifExist (newFile, movieArray) {
      var length = movieArray.length;
      var array = movieArray;
      if (length == 0) { return false; }
      if ( length > 0 ) {
        for ( var i = 0; i < length; i++) {
          if (array[i].movieID == newFile) {
            alert ("File exist");
            return true;
          }
        }
        return false;
      }
    }

    function removeVideo (movieArray, id, index) {
      movieArray.splice(index, 1);
      return movieArray;
    }

    function favoriteProc (movieArray, id, flag) {
      var toDo = flag;
      var length = movieArray.length;
      var array = movieArray;
      var id = id;
      for ( var i = 0; i < length; i++) {
        if (array[i].movieID == id) {
          if (toDo == 'add') {array[i].myFavorite = true;}
          if (toDo == 'remove') {array[i].myFavorite = false;}
        }
      }
      return array;
    }

    function parseMovieTable (movieTable) {
      angular.forEach(movieTable, function (property) {
        property.view = parseInt(property.view);
        property.comment = parseInt(property.comment);
        property.favorite = parseInt(property.favorite);
        property.like = parseInt(property.like);
      });
    }

    var exampleVideoDataBase = [
      "https://www.youtube.com/watch?v=4JOAqRS_lms" , 'https://youtu.be/vJ3a_AuEW18', 'ZBCOMG2F2Zk',
      'https://www.youtube.com/watch?v=n5scparvQWE', 'https://www.youtube.com/watch?v=enpDdpCS37A',
      'https://vimeo.com/138882294', 'https://vimeo.com/143831946', 'https://www.youtube.com/watch?v=hkrA5R-he0k',
      'https://www.youtube.com/watch?v=oLSdl-CdOBo', 'https://www.youtube.com/watch?v=aQeIYVM3YBM',
      'https://www.youtube.com/watch?v=tyG6YMLEWus', 'https://www.youtube.com/watch?v=Y05wiQQbFLU',
      'https://www.youtube.com/watch?v=Xt2sbtvBuk8', 'https://www.youtube.com/watch?v=juOB-IbCwJc',
      'https://www.youtube.com/watch?v=Qq8PTCxuzTA', 'https://www.youtube.com/watch?v=7MSFW8pZ-_4',
      'https://www.youtube.com/watch?v=VP9NZPAX_dA', 'https://www.youtube.com/watch?v=xULTMMgwLuo',
      'https://vimeo.com/121815627', 'https://vimeo.com/54228768', 'https://vimeo.com/35616659',
      'https://vimeo.com/97816836', 'https://vimeo.com/76990578', 'https://vimeo.com/62092214',
      'https://vimeo.com/69828650', 'https://vimeo.com/8191217', 'https://vimeo.com/1337926'
    ];

    return {
      exampleVideoDataBase: exampleVideoDataBase,
      ifExist: ifExist,
      favoriteProc: favoriteProc,
      removeVideo: removeVideo,
      parseMovieTable: parseMovieTable,
      chceckSource: chceckSource
    };

  }

})();

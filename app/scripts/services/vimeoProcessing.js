(function () {
  'use strict';

  angular.module('youTubeV2App')
  .factory('vimeoProcessing', vimeoProcessing);
  vimeoProcessing.$inject = ['$q', '$http'];

  function vimeoProcessing  ($q, $http) {

    var tempVideoArray = [];
    var VimeoMovie = function (movieId, viewCount, likeCount, commentCount, myFavorite) {
      var vm = this;
      vm.movieID = movieId;
      vm.view = viewCount;
      vm.like = likeCount;
      vm.comment = commentCount;
      vm.url = "https://player.vimeo.com/video/" + movieId + "?byline=0&portrait=0";
      vm.myFavorite = myFavorite || false;
    };

    function isValid (data) {
      var source = data;
      var sourceJson = JSON.stringify(source);
      var pattern = new RegExp("vimeo");
      var result = pattern.test(sourceJson);
      if (result == true) { return true; }
    }

    function processMovie (data) {
      var def = $q.defer();
      var movieID;
      getVimeoID(data)
      .then(function (id) {
        movieID = id;
        return getVimeoInfo (id);
      })
      .then(function(info) {
        tempVideoArray.unshift (new VimeoMovie (movieID, info.stats.plays, info.metadata.connections.likes.total, info.metadata.connections.comments.total));
        def.resolve(tempVideoArray[0]);
      });
      return def.promise;
    }

    function getVimeoID (param) {
      var match = param;
      var regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
      var parseUrl = regExp.exec(match);
      return $q.when(parseUrl[5]);
    }

    function getVimeoInfo (id) {
      var def = $q.defer();
      $http.get("https://api.vimeo.com/videos/"+ id +"?access_token=adbf9e027ab71033884e9dbb66a59721")
      .success(function (response) {
        def.resolve(response);
      }).error(function(error) {
        def.reject(error);
      });
      return def.promise;
    }

    return {
      isValid: isValid,
      processMovie: processMovie,
    };

  }

})();

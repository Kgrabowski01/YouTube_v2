(function () {
  'use strict';

  angular.module('youTubeV2App')
  .factory('youTubeProcessing', youTubeProcessing);
  youTubeProcessing.$inject = ['$q', '$http'];

  function youTubeProcessing ( $q, $http) {

    var tempVideoArray = [];
    var YoutubeMovie = function (movieId, viewCount, likeCount, commentCount, myFavorite) {
      var vm = this;
      vm.movieID = movieId;
      vm.view = viewCount;
      vm.like = likeCount;
      vm.comment = commentCount;
      vm.url = "https://www.youtube.com/v/" + movieId + "?rel=0&amp;showinfo=0"; // embed zamiast v powoduje brak errorow z chrome extension. V powoduje problemy przy skalowaniu
      vm.myFavorite = myFavorite || false;
    };

    function isValid (data) {
      var source = data;
      var sourceJson = JSON.stringify(source);
      var pattern = new RegExp("youtu");
      var result = pattern.test(sourceJson);
      if (result == true || data.length == 11) { return true; }
    }

    function processMovie (data) {
      var def = $q.defer();
      var movieID;
      getYoutubeID(data)
      .then(function (id) {
        movieID = id;
        return getYouTubeInfo (id);
      })
      .then(function(info) {
        tempVideoArray.unshift (new YoutubeMovie (movieID, info[0].statistics.viewCount, info[0].statistics.likeCount, info[0].statistics.commentCount));
        def.resolve(tempVideoArray[0]);
      });
      return def.promise;
    }

    function getYoutubeID (param) {
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      var match = param.match(regExp);
      if (match && match[2].length == 11) { return  $q.when(match[2]); }
      if (param.length == 11) { return $q.when(param); }
      return  $q.reject(false);
    }

    function getYouTubeInfo (id) {
      var def = $q.defer();
      $http.get("https://www.googleapis.com/youtube/v3/videos?id="+ id +"&key=AIzaSyDWzSHDPL1zB2OlOhjo327IybIwyj4_2u4%20&fields=items(statistics)&part=statistics")
      .success(function (response) {
        def.resolve(response.items);
      }).error(function(error) {
        def.reject(error);
      });
      return def.promise;
    }

    function bb (a) {
      console.log(a);
    }

    return {
      bb:bb,
      isValid: isValid,
      processMovie: processMovie
    };

  }

})();

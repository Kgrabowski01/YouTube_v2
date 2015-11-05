(function () {
  'use strict';

  angular.module('youTubeV2App')
  .factory('movieProcService', movieProcService);
  movieProcService.$inject = ['$q', '$http','$sce'];

  function movieProcService ( $q, $http, $sce) {

    var YoutubeMovie = function (movieId, viewCount, likeCount, favoriteCount, dislikeCount, commentCount, favourite) {
      var vm = this
      vm.movieID = movieId;
      vm.view = viewCount;
      vm.like = likeCount;
      vm.favorite = favoriteCount;
      vm.dislike = dislikeCount;
      vm.comment = commentCount;
      vm.url = "https://www.youtube.com/embed/" + movieId + "?rel=0&amp;showinfo=0";
      vm.favourite = favourite || false;
    };

    var VimeoMovie = function (movieId, favourite) {
      var vm = this
      vm.movieID = movieId;
      vm.url = "https://player.vimeo.com/video/" + movieId + "?byline=0&portrait=0";
      vm.favourite = favourite || false;
    };

    function sourceVimeo (toCheck) {
      var source = toCheck;
      var sourceJson = JSON.stringify(source)
      var pattern = new RegExp("vimeo");
      var result = pattern.test(sourceJson);
      if (result == true) { return true };
    };

    function getVimeoID (param) {
      var match = param;
      var regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/
      var parseUrl = regExp.exec(match)
      return $q.when(parseUrl[5]);
    };

    function getYoutubeID (param) {
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      var match = param.match(regExp);
      if (match && match[2].length == 11) { return  $q.when(match[2]); }
      if (param.length == 11) { return $q.when(param); }
      return  $q.reject(false);
    };

    // function getMovieInfo (id){
    //   $http.get("https://www.googleapis.com/youtube/v3/videos?id="+ id +"&key=AIzaSyDWzSHDPL1zB2OlOhjo327IybIwyj4_2u4%20&fields=items(statistics)&part=statistics")
    //   .success (function (response) {
    //    console.log (response.items);
    //    return $q.when(response.items);
    //   }).error(function(error) {
  //      return $a.reject(error);
  //    });
  //  };

    function getMovieInfo (id){
      var def = $q.defer();
      $http.get("https://www.googleapis.com/youtube/v3/videos?id="+ id +"&key=AIzaSyDWzSHDPL1zB2OlOhjo327IybIwyj4_2u4%20&fields=items(statistics)&part=statistics")
      .success(function (response) {
        def.resolve(response.items);
      }).error(function(error) {
        def.reject(error);
      });
      return def.promise;
    };

    function ifExist (newFile, movieArray) {
      var length = movieArray.length;
      var array = movieArray;
      var i;
      if (length == 0) { return false }
      if ( length > 0 ) {
        for (i = 0; i < length; i++) {
          if (array[i].movieID == newFile) {
            alert ("File exist");
            return true;
          };
        };
        return false;
      };
    };

    function removeVideo (movieArray, id, index){
      movieArray.splice(index, 1);
      return movieArray;
    };

    // function trustSrc (src) {
    //   console.log(src)
    //   console.log($sce.trustAsResourceUrl(src));
    //   return $sce.trustAsResourceUrl(src);
    // };

    return {
      //trustSrc: trustSrc,
      removeVideo: removeVideo,
      ifExist: ifExist,
      getVimeoID:  getVimeoID,
      sourceVimeo : sourceVimeo,
      getYoutubeID: getYoutubeID,
      getMovieInfo: getMovieInfo,
      YoutubeMovie: YoutubeMovie,
      VimeoMovie: VimeoMovie
    };

  };

})();

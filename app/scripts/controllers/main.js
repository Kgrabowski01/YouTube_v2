'use strict';

angular.module('youTubeV2App')
.controller('MainCtrl', function ($scope, $q, $http) {
  var vm = this

  var Movie = function (movieId, viewCount, likeCount, favoriteCount, dislikeCount, commentCount) {
    var xx = this // Jaka jest roznica miedzy this z 5 lini a tym this?
    xx.MovieID = movieId;
    xx.View = viewCount;
    xx.Like = likeCount;
    xx.Favorite = favoriteCount;
    xx.Dislike = dislikeCount;
    xx.Comment = commentCount;
    xx.Url = "https://www.youtube.com/embed/" + movieId + "?rel=0&amp;showinfo=0";
  };

  vm.movieList = [];

  vm.AddMovie = function () {
    vm.GetVideoID ($scope.newMovie).then( function (videoID) {
      vm.GetMovieInfo (videoID).then ( function (s) {
        vm.movieList.push (new Movie ( videoID, s[0].statistics.viewCount, s[0].statistics.likeCount, s[0].statistics.favoriteCount, s[0].statistics.dislikeCount, s[0].statistics.commentCount ));
        console.log ( vm.movieList );
        $scope.newMovie = "";
      },function (e) {
        console.log(e);
      });
    },function (e) {
      console.log (e) ;
    })
  };

  vm.GetVideoID = function(param){
    var def = $q.defer();
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = param.match(regExp);
    if (match && match[2].length == 11) {
      def.resolve(match[2]);
    }else if(param.length == 11){
      def.resolve(param);
    } else {
      def.reject(false);
    }
    return def.promise;
  }

  vm.GetMovieInfo = function(id){
    var def = $q.defer();
    $http.get("https://www.googleapis.com/youtube/v3/videos?id="+ id +"&key=AIzaSyDWzSHDPL1zB2OlOhjo327IybIwyj4_2u4%20&fields=items(statistics)&part=statistics")
    .success(function (response) {
      def.resolve(response.items);
    }).error(function(error) {
      def.reject(error);
    });;
    return def.promise;
  }
  // https://www.googleapis.com/youtube/v3/videos?id=gXKLnDNYEzs&key=AIzaSyDWzSHDPL1zB2OlOhjo327IybIwyj4_2u4%20&fields=items(statistics)&part=statistics
});

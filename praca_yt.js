<!DOCTYPE html>
<html  ng-app="MyApp">
<head>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.13/angular.js"></script>
<script src="app.js"></script>
</head>
<body>
  <div ng-controller="VideoController">

    <p> Input: <input  type="text" ng-model="adress" value="Rfz2SYOUEeA">Rfz2SYOUEeA  AoZYaUXmGB8</p>
    <button ng-click="addMovies()">Add a line</button>
    </br></br>
    <div ng-repeat="movie in newMovies">
      <div my-youtube code="movie"></div>

      <div ng-controller="VideoInfoController">
        <ul>
          <li ng-repeat="info in videoInfo">
            Views: {{ info.statistics.viewCount }},
            Likes: {{ info.statistics.likeCount }},
            Dislike: {{ info.statistics.dislikeCount }},
            Favorite: {{ info.statistics.favoriteCount }}
          </li>
        </ul>
      </div>

      </div>

    </div>
</body>
</html>


var app = angular.module("MyApp", []);

app.controller("VideoController", function($scope) {

    $scope.newMovies = [];

    $scope.addMovies = function () {
        $scope.newMovies.push($scope.adress);
        //$scope.adress="";
    };

});


app.controller("VideoInfoController", function($scope, $http) {
  $http.get("https://www.googleapis.com/youtube/v3/videos?id="+ $scope.adress +"&key=AIzaSyDWzSHDPL1zB2OlOhjo327IybIwyj4_2u4%20&fields=items(statistics)&part=statistics")
  .success(function (response) {$scope.videoInfo = response.items;});
});

app.directive('myYoutube', function($sce) {
  return {
    restrict: 'EA',
    scope: { code:'=' },
    replace: true,
    template: '<div style="height:200px;width:50%"><iframe style="overflow:hidden;height:100%;width:100%" width="50%" height="50%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
    link: function (scope) {
        scope.$watch('code', function (newVal) {
           if (newVal) {
               scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
               //
           }
        });
    }
  };
});

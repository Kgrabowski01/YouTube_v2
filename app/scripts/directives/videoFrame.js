(function(){
  'use strict';
  angular.module('youTubeV2App')
  .directive('videoFrame', function ($sce) {
    var template = '<iframe class="{{style}}" src="{{vFrame.trusted(url)}}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    return {
      restrict: 'EA',
      controller: ["$scope","$sce", function (scope, $sce) {
        var vm = this;
        vm.trusted = trusted;
        function trusted (url) {
          return $sce.trustAsResourceUrl(url);
        }
      }],
      controllerAs:'vFrame',
      scope: {
        url:'=',
        style:'@'
      },
      template: template,
    };
  });
})();

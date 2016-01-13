(function(){
  'use strict';
  angular.module('youTubeV2App')
  .directive('videoFrameWindow', function () {
    var template = '<button class="{{style}}" ng-click="ctrl.newFrameWindow(url)"></button>';
    return {
      restrict: 'EA',
      controller: ["$scope", function (scope) {
        var vm = this;
        vm.newFrameWindow = newFrameWindow;
        
        function newFrameWindow (newIframe) {
          var newFrame = window.open(newIframe, '_blank');
        };
      }],
      controllerAs:'ctrl',
      scope: {
        url:'=',
        style:'@'
      },
      template: template,
    };
  });
})();

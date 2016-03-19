(function(){
  'use strict';
  angular.module('youTubeV2App')
  .directive('videoFrameWindow', function () {
    var template = '<button class="{{ctrl.style}}" ng-click="ctrl.newFrameWindow()"></button>';
    var controller = () => {
      var vm = this;
      vm.newFrameWindow = () => {
        var newFrame = window.open(vm.url, '_blank');
      }
    }

    return {
      restrict: 'EA',
      controller: controller,
      controllerAs:'ctrl',
      bindToController: {
        url:'=',
        style:'@'
      },
      scope: {},
      template: template,
    };
  });
})();

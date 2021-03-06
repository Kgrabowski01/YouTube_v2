(function(){
  'use strict';
  angular.module('youTubeV2App')
  .directive('videoFrame', function () {
    var template = '<iframe class="{{vFrame.style}}" src="{{vFrame.trusted()}}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    var controller = function ($sce) {
      var vm = this;
      vm.trusted = trusted;
      function trusted () {
        return $sce.trustAsResourceUrl(vm.url);
      }
    };
    return {
      restrict: 'EA',
      controller: controller,
      controllerAs:'vFrame',
      bindToController: {
        url:'=',
        style:'@'
      },
      scope: {},
      template: template,
    };
  });
})();

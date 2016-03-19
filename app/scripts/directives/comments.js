(function(){
  'use strict';
  angular.module('youTubeV2App')
  .directive('commentsDirective', function () {

    var controller = function () {
    };

    return {
      controller:controller,
      controllerAs:'ctrl',
      bindToController: {
        parentIndex: '=',
        parentObject: '=',
        commentFunction: '=',
        newCommentUser: '=',
        newCommentBody: '='
      },
      scope: {},
      restrict: 'EA',
      templateUrl: 'views/comments.html'
    };
  });
})();

(function () {
  'use strict';

  angular.module('youTubeV2App')
  .factory('commentService', commentService);
  commentService.$inject = ['$q'];
  function commentService ($q) {

    var NewComment = function (user, comment) {
      var vm = this;
      vm.user = user;
      vm.comment = comment;
      //vm.date = date || false;
    };

    function createComment (user, comment) {
      if (user === undefined && comment === undefined) return false;
      var def = $q.defer();
      var tempObj = new NewComment(user, comment);
      def.resolve(tempObj);
      return def.promise;
    }

    return {
      createComment: createComment
    };

  }

})();

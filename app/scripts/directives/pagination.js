(function(){
  'use strict';
  angular.module('youTubeV2App')

  .directive('pagination', function (paginationService) {
    return {
      // controller: ["$scope", function ($scope) {
      //   var vm = this;
      //   vm.blabla = paginationService.pageSize;
      //   vm.qaz = qaz;
      //
      //   function qaz (asd) {
      //     paginationService.pageSize = asd;
      //     console.log(paginationService.pageSize);
      //     $scope.$apply();
      //   }
      // }],
      // controllerAs:'qwe',
      restrict: 'E',
      templateUrl: 'views/pagination.html'
    };
  });

})();


// (function(){
//   'use strict';
//   angular.module('youTubeV2App')
//
//   .directive('pagination', function () {
//     return {
//       controller: 'paginationCtrl',
//       controllerAs: 'pag',
//       bindToController: {
//         bindPage: '=',
//         bindSize: '='
//       },
//       restrict: 'E',
//       templateUrl: 'views/pagination.html'
//     };
//   });
//
// })();


// return {
//   controller: 'paginationCtrl',
//   controllerAs: 'pag',
//    bindToController: true,
//   restrict: 'E',
//   templateUrl: 'views/pagination.html'
// };
// });


// (function(){
//   'use strict';
//   angular.module('youTubeV2App')
//
//   .directive('pagination', function () {
//       return {
//       restrict: 'E',
//       templateUrl: 'views/pagination.html'
//     };
//   });
//
// })();

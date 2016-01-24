'use strict';

/**
 * @ngdoc overview
 * @name youTubeV2App
 * @description
 * # youTubeV2App
 *
 * Main module of the application.
 */
angular
  .module('youTubeV2App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

'use strict';
exports.module = angular.module('app.access', [
    'ui.router'
  ])
  .config(['$stateProvider',
  function ($stateProvider) {
      $stateProvider
      .state('login', {
          url: '/login',
          templateUrl: 'modules/access/login.html',
          controller: function($scope, $state){
             $scope.message = 'Login Form Here';
          }
      })
  }
  ]);

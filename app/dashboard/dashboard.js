'use strict';
var dashboard = angular.module('app.dashboard', [
    'ui.router'
  ])
  .config(['$stateProvider',
  function ($stateProvider) {
      $stateProvider
      .state('dashboard', {
          url: '/dashboard',
          templateUrl: 'views/index.html',
          controller: function($scope, $state){
              console.log($state);
             $scope.message = 'Hell Yeah!'
          }
      })
  }
  ])


exports.module = dashboard;

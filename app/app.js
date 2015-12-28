require('angular');
require('./local');
require('angular-ui-router');
require('angular-ui-bootstrap');
require('restangular');
require('./directives/directives');
require('./services/main');
require('./modules/modules');

angular.module('app', ['ui.router', 'ui.bootstrap', 'restangular', 'app.directives', 'app.services', 'app.modules'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/dashboard');
}])
.run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }

])
//API restangular
.factory('API', ['Restangular', function(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(settings.baseApiUrl);
    });
}])

.controller('AppCtrl', ['$scope', '$window', '$state', 'Auth',
    function ($scope, $window, $state, Auth) {
        console.log(Auth.isAuthenticated());
        // config
        $scope.app = {
            name: 'Angular Boilerplate',
            version: '0.0.1'
        }

    }
]);

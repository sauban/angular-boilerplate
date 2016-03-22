require('angular');
require('angular-ui-router');
require('angular-ui-bootstrap');
require('restangular');
require('oclazyload');
require('./directives/main');
require('./services/main');
require('./modules/main');

angular.module('app', ['ui.router', 'ui.bootstrap','restangular', 'app.directives', 'app.services',
                'app.modules', 'oc.lazyLoad'])

.config(['$stateProvider', '$ocLazyLoadProvider', '$urlRouterProvider', 'RestangularProvider', function($stateProvider, $ocLazyLoadProvider, $urlRouterProvider, RestangularProvider){
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
        if (data.response && data.response.data) {
            var returnedData = data.response.data;
            return returnedData;
        } else {
            return data;
        };
    });
    $urlRouterProvider.otherwise('/');

    $ocLazyLoadProvider.config({
        debug: true,
        events: true,
        modules: [{
            name: 'ngGrid',
            files: [
                'assets/libs/lazyload/modules/ng-grid/ng-grid.min.js',
                'assets/libs/lazyload/modules/ng-grid/ng-grid.min.css',
                'assets/libs/lazyload/modules/ng-grid/theme.css'
            ]
        }, {
            name: 'ui.grid',
            files: [
                'assets/libs/lazyload/modules/angular-ui-grid/ui-grid.min.js',
                'assets/libs/lazyload/modules/angular-ui-grid/ui-grid.min.css'
            ]
        }, {
            name: 'ui.select',
            files: [
                'assets/libs/lazyload/modules/angular-ui-select/select.min.js',
                'assets/libs/lazyload/modules/angular-ui-select/select.min.css'
            ]
        }, {
            name: 'angularFileUpload',
            files: [
                'assets/libs/lazyload/modules/angular-file-upload/angular-file-upload.min.js'
            ]
        }, {
            name: 'ui.calendar',
            files: ['assets/libs/lazyload/modules/angular-ui-calendar/calendar.js']
        }, {
            name: 'ngImgCrop',
            files: [
                'assets/libs/lazyload/modules/ngImgCrop/ng-img-crop.js',
                'assets/libs/lazyload/modules/ngImgCrop/ng-img-crop.css'
            ]
        }, {
            name: 'angularBootstrapNavTree',
            files: [
                'assets/libs/lazyload/modules/angular-bootstrap-nav-tree/abn_tree_directive.js',
                'assets/libs/lazyload/modules/angular-bootstrap-nav-tree/abn_tree.css'
            ]
        }, {
            name: 'toaster',
            files: [
                'assets/libs/lazyload/modules/angularjs-toaster/toaster.js',
                'assets/libs/lazyload/modules/angularjs-toaster/toaster.css'
            ]
        }, {
            name: 'textAngular',
            files: [
                'assets/libs/lazyload/modules/textAngular/textAngular-sanitize.min.js',
                'assets/libs/lazyload/modules/textAngular/textAngular.min.js'
            ]
        }, {
            name: 'vr.directives.slider',
            files: [
                'assets/libs/lazyload/modules/angular-slider/angular-slider.min.js',
                'assets/libs/lazyload/modules/angular-slider/angular-slider.css'
            ]
        }, {
            name: 'com.2fdevs.videogular',
            files: [
                'assets/libs/lazyload/modules/videogular/videogular.min.js'
            ]
        }, {
            name: 'com.2fdevs.videogular.plugins.controls',
            files: [
                'assets/libs/lazyload/modules/videogular/plugins/controls.min.js'
            ]
        }, {
            name: 'com.2fdevs.videogular.plugins.buffering',
            files: [
                'assets/libs/lazyload/modules/videogular/plugins/buffering.min.js'
            ]
        }, {
            name: 'com.2fdevs.videogular.plugins.overlayplay',
            files: [
                'assets/libs/lazyload/modules/videogular/plugins/overlay-play.min.js'
            ]
        }, {
            name: 'com.2fdevs.videogular.plugins.poster',
            files: [
                'assets/libs/lazyload/modules/videogular/plugins/poster.min.js'
            ]
        }, {
            name: 'com.2fdevs.videogular.plugins.imaads',
            files: [
                'assets/libs/lazyload/modules/videogular/plugins/ima-ads.min.js'
            ]
        }, {
            name: 'xeditable',
            files: [
                'assets/libs/lazyload/modules/angular-xeditable/js/xeditable.min.js',
                'assets/libs/lazyload/modules/angular-xeditable/css/xeditable.css'
            ]
        }]
    });
}])
.run(['$rootScope', '$state', '$stateParams', 'Auth', '$location',
    function ($rootScope, $state, $stateParams, Auth, $location) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            var user = Auth.getUser();
            if (user) {
                if (Date.create(user.exp * 1000).isPast()) {
                    event.preventDefault();

                    Auth.logout();
                    $state.go('access.login');
                }
            }

            if (toState.name == 'access.login' && Auth.isAuthenticated()) {
                $location.path('/');
            }

            if (!Auth.authorize(toState.role)) {
                event.preventDefault();

                $state.go('access.login');
            }

        });

    }

])

//API restangular
.factory('API', ['Restangular', function(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(settings.baseApiUrl);
    });
}])

.controller('AppCtrl', ['$scope', '$window', '$state', 'Auth', '$rootScope',
    function ($scope, $window, $state, Auth, $rootScope) {
        // config
        $scope.app = {
            name: 'Abuntoo',
            version: '0.0.1'
        }

        $rootScope.user = Auth.getUser();
        $scope.$on('fetchUserData', function (event, data) {
            $rootScope.user = Auth.getUser();
        });
        $scope.logout = function () {
            Auth.logout();
            window.location.reload();
            // $state.go('landing');
        }
        $scope.search = {};
        $scope.searchSite = function(){
            if($scope.search.text){
                $state.go('reward.searchsite', {search_query: $scope.search.text});
            }
        }

    }
])
.constant('JQ_CONFIG', {
    easyPieChart: ['assets/libs/lazyload/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
    sparkline: ['assets/libs/lazyload/jquery/charts/sparkline/jquery.sparkline.min.js'],
    plot: ['assets/libs/lazyload/jquery/charts/flot/jquery.flot.min.js',
        'assets/libs/lazyload/jquery/charts/flot/jquery.flot.resize.js',
        'assets/libs/lazyload/jquery/charts/flot/jquery.flot.tooltip.min.js',
        'assets/libs/lazyload/jquery/charts/flot/jquery.flot.spline.js',
        'assets/libs/lazyload/jquery/charts/flot/jquery.flot.orderBars.js',
        'assets/libs/lazyload/jquery/charts/flot/jquery.flot.pie.min.js'
    ],
    slimScroll: ['assets/libs/lazyload/jquery/slimscroll/jquery.slimscroll.min.js'],
    sortable: ['assets/libs/lazyload/jquery/sortable/jquery.sortable.js'],
    nestable: ['assets/libs/lazyload/jquery/nestable/jquery.nestable.js',
        'assets/libs/lazyload/jquery/nestable/nestable.css'
    ],
    filestyle: ['assets/libs/lazyload/jquery/file/bootstrap-filestyle.min.js'],
    slider: ['assets/libs/lazyload/jquery/slider/bootstrap-slider.js',
        'assets/libs/lazyload/jquery/slider/slider.css'
    ],
    chosen: ['assets/libs/lazyload/jquery/chosen/chosen.jquery.min.js',
        'assets/libs/lazyload/jquery/chosen/chosen.css'
    ],
    TouchSpin: ['assets/libs/lazyload/jquery/spinner/jquery.bootstrap-touchspin.min.js',
        'assets/libs/lazyload/jquery/spinner/jquery.bootstrap-touchspin.css'
    ],
    wysiwyg: ['assets/libs/lazyload/jquery/wysiwyg/bootstrap-wysiwyg.js',
        'assets/libs/lazyload/jquery/wysiwyg/jquery.hotkeys.js'
    ],
    dataTable: ['assets/libs/lazyload/jquery/datatables/jquery.dataTables.min.js',
        'assets/libs/lazyload/jquery/datatables/dataTables.bootstrap.js',
        'assets/libs/lazyload/jquery/datatables/dataTables.bootstrap.css'
    ],
    vectorMap: ['assets/libs/lazyload/jquery/jvectormap/jquery-jvectormap.min.js',
        'assets/libs/lazyload/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
        'assets/libs/lazyload/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
        'assets/libs/lazyload/jquery/jvectormap/jquery-jvectormap.css'
    ],
    footable: ['assets/libs/lazyload/jquery/footable/footable.all.min.js',
        'assets/libs/lazyload/jquery/footable/footable.core.css'
    ]
})
.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);

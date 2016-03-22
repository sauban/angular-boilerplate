'use strict';
module.exports = angular.module('app.landing', [
    'ui.router'
  ])
  .config(['$stateProvider',
  function ($stateProvider) {
      $stateProvider
      .state('landing', {
          url: '/',
          templateUrl: 'modules/landing/index.html',
          controller: 'landingCtrl'
      })
  }
  ])
  .controller('landingCtrl', ['$scope', '$state', 'API', 'Auth', 'VarService', '$timeout',
    function ($scope, $state, API, Auth,VarService, $timeout) {
          VarService.clearAll();
        API.one('content', 'landing')
            .get()
            .then(function(res){
                  $scope.content = res;
                  //var s = [];
                  //var bs = [];
                  //$scope.content.body.forEach(function(a, i){
                        //if(i++ % 2 == 0){
                              //if(s.length === 2){
                                    //bs.push(s);
                                    //s = [];
                                    //s.push(a);
                              //} else {
                                    //s.push(a);
                              //}
                        //} else {
                              //s.push(a);
                        //}
                  //});
                  //if(s.length === 2){
                        //bs.push(s);
                  //}
                  //$scope.content.bodyM = bs;
                  //$timeout(function(){
                      //$('.my-slider').unslider({
                          //autoplay: true,
                          ////arrows: false,
                          //nav: false
                      //});
                //}, 0, false);
            })
    }
  ])

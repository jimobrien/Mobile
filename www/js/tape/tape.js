angular.module('cmm.tape', ['ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {  
  $stateProvider
    .state('tape', {
      url: '/tape',
      templateUrl: 'tape.html',
      controller: 'TapeCtrl'
    });

    $urlRouterProvider.otherwise('/splash');
});
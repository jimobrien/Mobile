angular.module('cmm.pulse', ['ui.router', 'cmm.sockets', 'timeago'])
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {  
  $stateProvider
    .state('pulse', {
      url: '/pulse',
      templateUrl: 'pulse.html',
      controller: 'PulseCtrl'
    });
    $urlRouterProvider.otherwise('/splash');
}])
.controller('PulseCtrl', ['$scope', 'Sockets', function ($scope, Sockets) {
  var summary = Sockets.summary;

  summary.on('update', function(data) {
    $scope.lastUpdate = (new Date()).toISOString();

    $scope.high = data.high.toFixed(2);
    $scope.low = data.low.toFixed(2);
    $scope.range = (data.range * 100);

    $scope.vwap = data.vwap.toFixed(2);
    $scope.volumeBTC = Math.round(data.volume);
    $scope.volumeUSD = Math.round(data.volume * data.vwap);

    $scope.volatility = (data.coefficientOfVariation * 100);
    $scope.numTrades = Math.round(data.numTrades);
    $scope.avgTrade = (data.volume / data.numTrades);

  });
}])
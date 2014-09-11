angular.module('CMM.widgets', [])
.directive('widgetCard', [function () {
  return {
    restrict: 'E',
    templateUrl: 'views/card.tpl.html',
    link: function (scope, element, attrs) {
      
    }
  };
}]);
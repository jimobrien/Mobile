angular.module('cmm.widgets', [])
.directive('widgetCard', [function () {
  return {
    restrict: 'E',
    templateUrl: 'js/widgets/views/card.tpl.html',
    link: function (scope, element, attrs) {
      
    }
  };
}]);
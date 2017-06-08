angular.module('despegar')
  .controller('mapCtrl', ['$scope', function ($scope) {
    $scope.map = false;
    $scope.action = 'Ampliar mapa';

    $scope.actionMap = function () {
      if ($scope.map) {
        $scope.map = false;
        $scope.action = 'Ampliar mapa';
      } else {
        $scope.map = true;
        $scope.action = 'Ocultar mapa';
      }
    }
  }]);

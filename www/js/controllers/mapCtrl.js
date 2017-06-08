angular.module('despegar')
  .controller('mapCtrl', ['$scope', function ($scope) {
    $scope.map = false;
    $scope.action = 'Ampliar mapa';

    /**
    * Activo y Desactivo el mapa en función a su estado actual
    *
    * @returns {undefined}
    */
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

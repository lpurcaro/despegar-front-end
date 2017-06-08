angular.module('despegar')
  .controller('formCtrl', ['$scope', function ($scope) {
    $scope.config = {
      entrada: {
        dropdownSelector: '#entrada',
        minView: 'day'
      },
      salida: {
        dropdownSelector: '#salida',
        minView: 'day'
      }
    }

    $scope.actual = function ($dates) {
      const today = new Date();
      today.setUTCHours(0,0,0,0);
      $dates.filter(function (date) {
        return date.utcDateValue < today.getTime();
      }).forEach(function (date) {
        date.selectable = false;
      });
    }

    $scope.habitaciones = new Array(5);
    $scope.adultos = new Array(4);
    $scope.menores = new Array(6);

    $scope.buscar = function (data) {
      console.log(data);
    }
}]);

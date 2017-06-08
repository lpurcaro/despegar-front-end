angular.module('despegar')
  .controller('destinosCtrl', ['$scope', 'destinosService', function ($scope, destinosService) {
    $scope.availability = [];

    destinosService.getDestinos().then(function (response) {
      $scope.destinos = response.data.destinos;

      for (var i = 0; i < $scope.destinos.lenght; i++) {
        $scope.availability[i] = false;
      }
    }, function (error) {
      console.log(error);
    });
  }]);

angular.module('despegar')
  .controller('destinosCtrl', ['$scope', 'destinosService', function ($scope, destinosService) {
    /**
    * Vinculo los destinos de mi respuesta con la variable que utilizo en el modelo.
    *
    * @param {JSON} response - Respuesta exitosa del servicio.
    *
    * @returns {undefined}
    */
    destinosService.getDestinos().then(function (response) {
      $scope.destinos = response.data.destinos;
    });
  }]);

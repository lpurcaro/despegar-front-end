angular.module('despegar')
  .controller('secondaryDataCtrl', ['$scope', 'secondaryDataService', function ($scope, secondaryDataService) {
    /**
    * Vinculo el contenido de mi respuesta con la variable que utilizo en el modelo.
    *
    * @param {JSON} response - Respuesta exitosa del servicio.
    *
    * @returns {undefined}
    */
    secondaryDataService.getData().then(function (response) {
      $scope.info = response.data.content;
    });
  }]);

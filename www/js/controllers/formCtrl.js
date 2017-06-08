angular.module('despegar')
  .controller('formCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
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

    /**
    * Deshabilita las fechas anteriores al dia correspondiente
		*
		* @returns {undefined}
		*/
    $scope.actual = function ($dates) {
      const today = new Date();
      today.setUTCHours(0,0,0,0);

      /**
      * Filtra las fechas que sean anteriores a la correspondiente
  		*
  		* @returns {Array}
  		*/
      $dates.filter(function (date) {
        return date.utcDateValue < today.getTime();

        /**
        * Deshabilita la opcion de seleccionar para todas las fechas del array
        *
        * @param {JSON} date - Elemento que contiene las propiedades de la fecha en el datepicker
    		*
    		* @returns {undefined}
    		*/
      }).forEach(function (date) {
        date.selectable = false;
      });
    }

    $scope.habitaciones = new Array(5);
    $scope.adultos = new Array(4);
    $scope.menores = new Array(6);

    $scope.request = '';

    /**
    * Setea la data del formulario a su origen y genera un mje de éxito que se desavnece luego de 3 segundos
    *
    * @param {JSON} data - La información enviada en el formulario
    *
    * @returns {undefined}
    */
    $scope.buscar = function (data) {
      console.log(data);

      $scope.data = {
        adultos: 1,
        cantidad: 0,
        ciudad: 'Rio de Janeiro, Brasil',
        menores: 0
      };

      $scope.request = 'Consulta enviada';

      /**
      * Elimina el mensaje de éxito luego de los 3 segundos
      *
      * @returns {undefined}
      */
      $timeout(function () {
        $scope.request = '';
      }, 3000);
    }
}]);

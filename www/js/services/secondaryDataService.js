angular.module('despegar')
  .service('secondaryDataService', ['$http', function ($http) {
    /**
     * Trae la data de la lista de hoteles que se muestra en la columa derecha
		 *
		 * @returns {Promise}
		 */
    this.getData = function () {
      return $http.get('data/contenido.json');
    }
  }]);

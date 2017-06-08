angular.module('despegar')
  .service('destinosService', [ '$http', function ($http) {
    /**
     * Trae la data de los destinos que se muestran en la parte inferior del sitio
		 *
		 * @returns {Promise}
		 */
    this.getDestinos = function () {
      return $http.get('data/destinos.json');
    }
  }]);

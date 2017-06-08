angular.module('despegar')
  .service('destinosService', [ '$http', function ($http) {
    /**
		 *
		 * @returns {Promise}
		 */
    this.getDestinos = function () {
      return $http.get('data/destinos.json');
    }
  }]);

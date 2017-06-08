angular.module('despegar')
  .service('secondaryDataService', ['$http', function ($http) {
    /**
		 *
		 * @returns {Promise}
		 */
    this.getData = function () {
      return $http.get('data/contenido.json');
    }

    /**
		 *
		 * @returns {Promise}
		 */
    this.getDestinos = function () {
      return $http.get('data/destinos.json');
    }
  }]);

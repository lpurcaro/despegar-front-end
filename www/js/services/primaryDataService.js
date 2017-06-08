angular.module('despegar')
  .service('primaryDataService', ['$http', function ($http) {
    /**
		 * Trae todos los Hoteles en Rio de Janeiro.
		 *
		 * @returns {Promise}
		 */
    this.getHotels = function () {
      return $http.get('data/hoteles-rio.json');
    }
  }]);

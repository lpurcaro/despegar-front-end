angular.module('despegar')
  .service('commentsService', ['$http', function ($http) {
    /**
		 * Trae todos los Comentarios de usuarios.
		 *
		 * @returns {Promise}
		 */
    this.getComments = function () {
      return $http.get('data/comentarios.json');
    }
  }]);

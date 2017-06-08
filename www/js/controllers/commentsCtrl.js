angular.module('despegar')
  .controller('commentsCtrl', ['$scope', 'commentsService', function ($scope, commentsService) {
    /**
    * Vinculo los comentarios de mi respuesta con la variable que utilizo en el modelo.
    *
    * @param {JSON} response - Respuesta exitosa del servicio.
    *
    * @returns {undefined}
    */
    commentsService.getComments().then(function (response) {
      $scope.comments = response.data.comments;
    }, function (error) {
      console.log(error);
    });
  }]);

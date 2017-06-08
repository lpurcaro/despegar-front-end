angular.module('despegar')
  .controller('commentsCtrl', ['$scope', 'commentsService', function ($scope, commentsService) {
    commentsService.getComments().then(function (response) {
      $scope.comments = response.data.comments;
    }, function (error) {
      console.log(error);
    });
  }]);

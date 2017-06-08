angular.module('despegar')
  .controller('secondaryDataCtrl', ['$scope', 'secondaryDataService', function ($scope, secondaryDataService) {
    secondaryDataService.getData().then(function (response) {
      $scope.info = response.data.content;
    }, function (error) {
      console.log(error);
    });
  }]);

angular.module('despegar')
  .controller('primaryDataCtrl', ['$scope', 'primaryDataService', function ($scope, primaryDataService) {
    $scope.currentPage = 1;
    $scope.totalPages = 279;

    $scope.configuration = {
      startView: 'day',
      minView: 'day'
    };

    primaryDataService.getHotels().then(function (response) {
      $scope.hotels = response.data.hotels;

      for (var i = 0; i < $scope.hotels.length; i++){
        $scope.hotels[i].show = 'Ver disponibilidad';
      }
    }, function (error) {
      console.log(error);
    });

    $scope.getImage = function (hotel) {
      return hotel.split(' ').join('-').toLowerCase();
    }

    $scope.isAvailable = function (index) {
      $scope.hotels[index].show = ($scope.hotels[index].show == 'Ver disponibilidad') ? 'Ocultar' : 'Ver disponibilidad';
    }

    $scope.startDate = function(hotel, $dates) {
      var fromDate = hotel.availability.from;
      var toDate = hotel.availability.to;

      const from = new Date(fromDate);
      const to = new Date(toDate);

      $dates.filter(function (date) {
        return (date.utcDateValue < to.getTime() && date.utcDateValue > from.getTime() || date.utcDateValue == to.getTime());
      }).forEach(function (date) {
        date.active = true;
      });
      $dates.filter(function (date) {
        return date;
      }).forEach(function (date) {
        date.selectable = false;
      });
    };
  }]);

angular.module('despegar', ['ui.bootstrap', 'ngMap', 'ui.bootstrap.datetimepicker']);

angular.module('despegar')
  .controller('commentsCtrl', ['$scope', 'commentsService', function ($scope, commentsService) {
    commentsService.getComments().then(function (response) {
      $scope.comments = response.data.comments;
    }, function (error) {
      console.log(error);
    });
  }]);

angular.module('despegar')
  .controller('destinosCtrl', ['$scope', 'destinosService', function ($scope, destinosService) {
    $scope.availability = [];

    destinosService.getDestinos().then(function (response) {
      $scope.destinos = response.data.destinos;

      for (var i = 0; i < $scope.destinos.lenght; i++) {
        $scope.availability[i] = false;
      }
    }, function (error) {
      console.log(error);
    });
  }]);

angular.module('despegar')
  .controller('formCtrl', ['$scope', function ($scope) {
    $scope.config = {
      entrada: {
        dropdownSelector: '#entrada',
        minView: 'day'
      },
      salida: {
        dropdownSelector: '#salida',
        minView: 'day'
      }
    }

    $scope.actual = function ($dates) {
      const today = new Date();
      today.setUTCHours(0,0,0,0);
      $dates.filter(function (date) {
        return date.utcDateValue < today.getTime();
      }).forEach(function (date) {
        date.selectable = false;
      });
    }

    $scope.habitaciones = new Array(5);
    $scope.adultos = new Array(4);
    $scope.menores = new Array(6);

    $scope.buscar = function (data) {
      console.log(data);
    }
}]);

angular.module('despegar')
  .controller('mainCtrl', ['$scope', function ($scope) {
    $scope.cantidad = 110;
    $scope.destino = {
      ciudad : 'Rio de Janeiro',
      pais : 'Brasil'
    };

    $scope.getStars = function (stars) {
      var count = [];
      for (var i = 0; i < stars; i++) {
        count.push(i);
      }
      return count;
    }

    $scope.breadcrumb = [
      "Despegar.com",
      "Hoteles",
      "Hoteles en Cuba",
      "Hoteles en " + $scope.destino.ciudad
    ];

    $scope.links = {
      facebook: 'https://www.facebook.com/DespegarArgentina',
      twitter: 'https://twitter.com/despegar',
      google: 'https://plus.google.com/+despegarcom'
    };

    $scope.template = {
      form: 'views/form.html',
      hotels: 'views/primaryData.html',
      map: 'views/map.html',
      comments: 'views/comments.html',
      secondaryData: 'views/secondaryData.html',
      destinos: 'views/destinos.html'
    };

  }]);

angular.module('despegar')
  .controller('mapCtrl', ['$scope', function ($scope) {
    $scope.map = false;
    $scope.action = 'Ampliar mapa';

    $scope.actionMap = function () {
      if ($scope.map) {
        $scope.map = false;
        $scope.action = 'Ampliar mapa';
      } else {
        $scope.map = true;
        $scope.action = 'Ocultar mapa';
      }
    }
  }]);

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

angular.module('despegar')
  .controller('secondaryDataCtrl', ['$scope', 'secondaryDataService', function ($scope, secondaryDataService) {
    secondaryDataService.getData().then(function (response) {
      $scope.info = response.data.content;
    }, function (error) {
      console.log(error);
    });
  }]);

angular.module('despegar')
  .filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
  });

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

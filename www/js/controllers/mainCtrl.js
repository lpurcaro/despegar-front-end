angular.module('despegar')
  .controller('mainCtrl', ['$scope', function ($scope) {
    $scope.cantidad = 110;
    $scope.destino = {
      ciudad : 'Rio de Janeiro',
      pais : 'Brasil'
    };

    /**
    * Genero un Array a partir del numero de estrellas que tiene el Hotel
    *
    * @param {string} stars - Cantidad de estrellas
    *
    * @returns {Array}
    */
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

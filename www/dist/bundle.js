angular.module('despegar', ['ui.bootstrap', 'ngMap', 'ui.bootstrap.datetimepicker']);

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

angular.module('despegar')
  .controller('destinosCtrl', ['$scope', 'destinosService', function ($scope, destinosService) {
    /**
    * Vinculo los destinos de mi respuesta con la variable que utilizo en el modelo.
    *
    * @param {JSON} response - Respuesta exitosa del servicio.
    *
    * @returns {undefined}
    */
    destinosService.getDestinos().then(function (response) {
      $scope.destinos = response.data.destinos;
    });
  }]);

angular.module('despegar')
  .controller('formCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
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

    /**
    * Deshabilita las fechas anteriores al dia correspondiente
		*
		* @returns {undefined}
		*/
    $scope.actual = function ($dates) {
      const today = new Date();
      today.setUTCHours(0,0,0,0);

      /**
      * Filtra las fechas que sean anteriores a la correspondiente
  		*
  		* @returns {Array}
  		*/
      $dates.filter(function (date) {
        return date.utcDateValue < today.getTime();

        /**
        * Deshabilita la opcion de seleccionar para todas las fechas del array
        *
        * @param {JSON} date - Elemento que contiene las propiedades de la fecha en el datepicker
    		*
    		* @returns {undefined}
    		*/
      }).forEach(function (date) {
        date.selectable = false;
      });
    }

    $scope.habitaciones = new Array(5);
    $scope.adultos = new Array(4);
    $scope.menores = new Array(6);

    $scope.request = '';

    /**
    * Setea la data del formulario a su origen y genera un mje de éxito que se desavnece luego de 3 segundos
    *
    * @param {JSON} data - La información enviada en el formulario
    *
    * @returns {undefined}
    */
    $scope.buscar = function (data) {
      console.log(data);

      $scope.data = {
        adultos: 1,
        cantidad: 0,
        ciudad: 'Rio de Janeiro, Brasil',
        menores: 0
      };

      $scope.request = 'Consulta enviada';

      /**
      * Elimina el mensaje de éxito luego de los 3 segundos
      *
      * @returns {undefined}
      */
      $timeout(function () {
        $scope.request = '';
      }, 3000);
    }
}]);

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

angular.module('despegar')
  .controller('mapCtrl', ['$scope', function ($scope) {
    $scope.map = false;
    $scope.action = 'Ampliar mapa';

    /**
    * Activo y Desactivo el mapa en función a su estado actual
    *
    * @returns {undefined}
    */
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

    /**
    * Vincula los hoteles de mi respuesta con la variable que utilizo en el modelo. Luego genera una key en los elementos de esa variable para definir el estado de visibilidad de las fechas disponibles en cada elemento.
    *
    * @param {JSON} response - Respuesta exitosa del servicio.
    *
    * @returns {undefined}
    */
    primaryDataService.getHotels().then(function (response) {
      $scope.hotels = response.data.hotels;

      for (var i = 0; i < $scope.hotels.length; i++){
        $scope.hotels[i].show = 'Ver disponibilidad';
      }
    });

    /**
    * A partir del nombre del hotel genera la url en la que se encuentra la imagen de dicho hotel, reemplazando los espacios por guiones medios.
    *
    * @param {string} hotel - Nombre del hotel.
    *
    * @returns {string}
    */
    $scope.getImage = function (hotel) {
      return hotel.split(' ').join('-').toLowerCase();
    }

    /**
    * Cambia el valor de visibilidad para las fechas disponibles en base al valor actual.
    *
    * @param {Number} index - Posición del elemento clickeado dentro del JSON.
    *
    * @returns {undefined}
    */
    $scope.isAvailable = function (index) {
      $scope.hotels[index].show = ($scope.hotels[index].show == 'Ver disponibilidad') ? 'Ocultar' : 'Ver disponibilidad';
    }

    /**
    * Genera la vista del datepicker antes de ser renderizado, deshabilitando fechas no disponibles y seleccionando fechas dentro de los parámetros de disponibilidad.
    *
    * @param {JSON} hotel - Elemento que contiene el datepicker
    * @param {} $dates - Elemento de fechas propio del datepicker.
    *
    * @returns {undefined}
    */
    $scope.startDate = function(hotel, $dates) {
      var fromDate = hotel.availability.from;
      var toDate = hotel.availability.to;

      const from = new Date(fromDate);
      const to = new Date(toDate);

      /**
      * Preselecciona las fechas dentro del rango dado. Mayores a la fecha de disponibilidad minima y menores a la fecha de disponibilidad máxima o iguales a ambas.
      *
      * @returns {Array}
      */
      $dates.filter(function (date) {
        return (date.utcDateValue < to.getTime() && date.utcDateValue > from.getTime() || date.utcDateValue == to.getTime() || date.utcDateValue == from.getTime());
      }).forEach(function (date) {
        date.active = true;
      });

      /**
      * Deshabilita todas las fechas del datepicker porque, en este caso, su funcionalidad es read only.
      *
      * @returns {Array}
      */
      $dates.filter(function (date) {
        return date;
      }).forEach(function (date) {
        date.selectable = false;
      });
    };
  }]);

angular.module('despegar')
  .controller('secondaryDataCtrl', ['$scope', 'secondaryDataService', function ($scope, secondaryDataService) {
    /**
    * Vinculo el contenido de mi respuesta con la variable que utilizo en el modelo.
    *
    * @param {JSON} response - Respuesta exitosa del servicio.
    *
    * @returns {undefined}
    */
    secondaryDataService.getData().then(function (response) {
      $scope.info = response.data.content;
    });
  }]);

angular.module('despegar')
  /**
   * Filtro para invertir el orden del array en ng-repeat
   *
   * @returns {Array}
   */
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
     * Trae la data de los destinos que se muestran en la parte inferior del sitio
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
     * Trae la data de la lista de hoteles que se muestra en la columa derecha
		 *
		 * @returns {Promise}
		 */
    this.getData = function () {
      return $http.get('data/contenido.json');
    }
  }]);

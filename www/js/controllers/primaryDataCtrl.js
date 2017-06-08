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

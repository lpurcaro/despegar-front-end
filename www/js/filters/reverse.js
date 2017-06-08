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

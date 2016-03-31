Stats.directive('bbpStatsUpdateView', [
  '$scope',
  '$log',
  function($log, $scope) {
    return {
      restrict: 'E',
      templateUrl: './scripts/module/stats/template/stats.update.html'
    }

  }
]);
Stats.directive('bbpStatsRList', [
  '$log',
  function($log) {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/stats/templates/stats.roster.list.html'
    }

  }
]);
Stats.directive('bbpMlbHittersStatsList', [
  '$log',
  function($log) {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/stats/templates/hitter.list.html',
      link: function(scope, el, attrs) {

      }
    }
  }
]);
Stats.directive('bbpMlbPitchersStatsList', [
  '$log',
  function($log) {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/stats/templates/pitcher.list.html',
      link: function(scope, el, attrs) {

      }
    }
  }
]);

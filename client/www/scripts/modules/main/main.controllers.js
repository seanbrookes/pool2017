Main.controller('MainController', [
  '$scope',
  '$log',
  function($scope, $log){
    $log.debug('Main Controller');
    $scope.currentRoster = {};
    $scope.currentFilter = '';
    $scope.bbpCtx = {};
    $scope.currentRosterSlug = 'mashers';

    function init() {

        $scope.bbpCtx = {
          homeRoster: '',
          currentRoster: '',
          currentPosFilter: ''
        };


    }

    $scope.isDog = function(){
      if(localStorage.getItem('homeRoster')){
        if (localStorage.getItem('homeRoster') === 'bashers'){
          return true;
        }
        return false;
      }
      return false;
    };

    if (window.localStorage && window.localStorage.getItem('homeRoster')) {
      $scope.bbpCtx.homeRoster = window.localStorage.getItem('homeRoster');
    }
    init();
}]);

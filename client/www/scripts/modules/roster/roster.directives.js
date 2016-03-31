Roster.directive('bbpPlayerForm', [
  function() {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/roster/templates/roster.player.form.html',
      controller: [
        '$scope',
        '$log',
        'Roster',
        function($scope, $log, Roster) {
          $scope.clearEditPlayer = function() {
            delete $scope.currentEditRoster.editPlayer;



          };
          $scope.saveEditPlayer = function() {
            var rosterObj = $scope.currentEditRoster;
            delete rosterObj._id;
            Roster.upsert(rosterObj,
              function(response){
                console.log('good update roster');
                var filter = {
                  'filter[where][slug]':$scope.currentRosterName
                };
                $scope.currentRoster = Roster.query(filter);
                $scope.currentRoster.$promise.then(function (result) {
                  $scope.currentRoster = result[0];

                  $scope.players = $scope.currentRoster.players;
                  $scope.player = {
                    draftStatus:'roster',
                    status:'regular',
                    posType:'hitter'
                  };
                });
              },
              function(response){
                console.log('bad update roster');
              }
            );

          }

        }
      ]
    }
  }
]);

Roster.directive('bbpRosterDraftView', [
  function() {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/roster/templates/roster.draft.view.html'
    }
  }
]);
Roster.directive('bbpDraftRosterBashers', [
  '$timeout',
  function($timeout) {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/roster/templates/roster.draft.list.b.html',
      link: function(scope, el, attrs) {
        scope.dPlayers = [];
        scope.$watch('rosterDraftCtx.bashersRoster', function(newRoster) {
          if (newRoster && newRoster.players) {
            //scope.dPlayers = newRoster.players;

          }
        }, true);


      }
    }
  }
]);
Roster.directive('bbpDraftRosterRallycaps', [
  '$timeout',
  function($timeout) {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/roster/templates/roster.draft.list.r.html',
      link: function(scope, el, attrs) {
        scope.dPlayers = [];
        scope.$watch('rosterDraftCtx.rallycapsRoster', function(newRoster) {
          if (newRoster && newRoster.players) {
            //scope.dPlayers = newRoster.players;

          }
        }, true);


      }
    }
  }
]);
Roster.directive('bbpDraftRosterStallions', [
  '$timeout',
  function($timeout) {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/roster/templates/roster.draft.list.s.html',
      link: function(scope, el, attrs) {
        scope.dPlayers = [];
        scope.$watch('rosterDraftCtx.stallionsRoster', function(newRoster) {
          if (newRoster && newRoster.players) {
           // scope.dPlayers = newRoster.players;

          }
        }, true);

      }
    }
  }
]);
Roster.directive('bbpDraftRosterMashers', [
  '$timeout',
  function($timeout) {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/roster/templates/roster.draft.list.m.html',
      link: function(scope, el, attrs) {

        scope.dPlayers = [];
        scope.$watch('rosterDraftCtx.mashersRoster', function(newRoster) {
          if (newRoster && newRoster.players) {
           // scope.dPlayers = newRoster.players;

          }
        }, true);

      }
    }
  }
]);
Roster.directive('bbpRosterEdit', [
  function() {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/roster/templates/roster.edit.html',
      controller: [
        '$scope',
        '$log',
        'RosterService',
        'Roster',
        '$state',
        '$stateParams',
        function ($scope, $log, RosterService, Roster, $state, $stateParams) {

          $scope.currentEditRoster = {
            slug:'bashers'
          };

          $scope.cRoster = {};

          if ($stateParams.slug) {

            $scope.currentEditRoster.slug = $stateParams.slug;

          }


          $scope.updatePlayerPos = function() {
            Roster.upsert($scope.currentEditRoster.roster,
              function(response){
                console.log('good update roster');
                $scope.currentEditRoster = RosterService.getRoster($scope.currentEditRoster.slug)
                  .then(function(roster) {

                    var startersArray = [];
                    var closersArray = [];

                    roster.map(function(player) {
                      if (player.pos === 'sp') {
                        startersArray.push(player);
                      }
                      if (player.pos === 'rp') {
                        closersArray.push(player);
                      }
                    });


                    roster.players = $scope.positionSort(roster);

                    roster.players.concat(startersArray);
                    roster.players.concat(closersArray);

                    $scope.currentEditRoster.roster = roster;
                  });
              },
              function(response){
                console.log('bad update roster');
              }
            );
          };

          $scope.editPlayer = function(player) {
            $scope.currentEditRoster.editPlayer = player;
          };
          $scope.deletePlayer = function(player) {
            if (confirm('delete player? ')) {
              RosterService.deleteRosterPlayer($scope.currentEditRoster.roster, player)
                .$promise
                .then(function(response) {
                  $log.debug('player deleted');

                });

            }
          };

          // init the roster for editing
          $scope.currentEditRoster = RosterService.getRoster($scope.currentEditRoster.slug)
            .then(function(roster) {


              var startersArray = [];
              var closersArray = [];

              roster.players.map(function(player) {
                if (player.pos === 'SP') {
                  startersArray.push(player);
                }
                if (player.pos === 'RP') {
                  closersArray.push(player);
                }
              });


              roster.players = $scope.positionSort(roster);

              var plusStarters = roster.players.concat(startersArray);

              var plusClosers = plusStarters.concat(closersArray);

              roster.players = plusClosers;

              //roster.players.concat(startersArray);
              //roster.players.concat(closersArray);

             // roster.players = $scope.positionSort(roster);

              $scope.currentEditRoster.roster = roster;
            });

        }
      ]
    }
  }
]);

Roster.directive('bbpProtectedRoster', [
  function() {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/roster/templates/roster.protected.html',
      controller: [
        '$scope',
        '$log',
        '$state',
        '$stateParams',
        function($scope, $log, $state, $stateParams) {

          $scope.tabNames = ['bashers', 'rallycaps', 'mashers', 'stallions'];

          $scope.activeTabIndex = 0;

          $scope.currentRoster = 'bashers';
          if ($stateParams.slug) {

            $scope.currentRoster = $stateParams.slug;
          }



          $scope.isDisabled = function(rosterSlug) {
            if ($scope.bbpCtx.homeRoster === rosterSlug) {
              return false;
            }
            if ($scope.bbpCtx.homeRoster === 'dog') {
              return false;
            }
            return true;
          }

        }],
      link: function(scope, el, attrs) {

      }
    }
  }
]);
Roster.directive('bbpProtectedRosterList', [
  function() {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/roster/templates/roster.protected.list.html',
      controller: [
        '$scope',
        '$log',
        '$state',
        '$stateParams',
        function($scope, $log, $state, $stateParams) {

        $scope.tabNames = ['bashers', 'rallycaps', 'mashers', 'stallions'];

        $scope.activeTabIndex = 0;
        $scope.currentRoster = 'bashers';
        if ($stateParams.slug) {

          $scope.currentRoster = $stateParams.slug;
        }

        $scope.isDisabled = function(rosterSlug) {
          if ($scope.bbpCtx.homeRoster === rosterSlug) {
            return false;
          }
          if ($scope.bbpCtx.homeRoster === 'dog') {
            return false;
          }
          return true;
        }

      }],
      link: function(scope, el, attrs) {

      }
    }
  }
]);
/*
*
*  http://pool2015.herokuapp.com/#authuser/rallycaps
 * http://pool2015.herokuapp.com/#authuser/bashers
 * http://pool2015.herokuapp.com/#authuser/mashers
 * http://pool2015.herokuapp.com/#authuser/stallions
*
* */

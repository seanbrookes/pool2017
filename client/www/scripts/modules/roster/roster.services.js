/**
 * Created by seanbrookes on 2014-03-27.
 */
Roster.service('RosterService',[
  'Roster',
  '$q',
  '$log',
  function(Roster,$q, $log){

    var svc = {};

    svc.getAllRosters = function() {
      //Roster.find({}, function(err, respon))
      return Roster.find({})
        .$promise
        .then(function(response) {
          return response;
        })
        .catch(function(error) {
          $log.warn('bad get all rosters: ' + JSON.stringify(error));
        });
    };
    svc.getRoster = function(slug) {
      var filter = {
        'filter[where][slug]':slug
      };
      return Roster.query(filter)
        .$promise
        .then(function(response) {
          return response[0];
        })
        .catch(function(error) {
          $log.warn('bad get roster: ' + error.message);
        });

      //var filter = {
      //  'filter[where][roster]':slug
      //};
      //return Roster.find(filter)
      //  .$promise
      //  .then(function(response) {
      //    return response;
      //  })
      //  .catch(function(error) {
      //    $log.warn('bad get roster: ' + JSON.stringify(error));
      //  })
    };
    svc.updateRoster = function(roster) {
      delete roster._id;
      return Roster.upsert(roster,
        function(response) {
          return response;
        },
        function(error) {
          $log.warn('bad update roster: ' + error.message);
          return;
        });
    };
    svc.deleteRosterPlayer = function(roster, player) {
      roster.players.map(function(p, i) {
        if (p.name === player.name) {
          $log.debug('delete player at index: ' + i);
          roster.players.splice(i, 1);
        }
      });
      return svc.updateRoster(roster);
    };

    var deferred = $q.defer();
    var slug = 'bashers';
    var filter = {
      'filter[where][slug]':slug
    };
//    Roster.find(filter).
//      then(function(response){
//        deferred.resolve(data);
//      }
//    );

    svc.getRosterBySlug = function(slug){
      console.log('strangely in the function  getRosterBySlug');
      return deferred.promise;
    };

    return svc;

  }
]);

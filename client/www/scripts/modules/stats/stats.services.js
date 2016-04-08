Stats.service('StatsServices', [
  '$log',
  'Totals',
  'Dailybatterstat',
  'Dailypitcherstat',
  function($log, Totals, Dailybatterstat, Dailypitcherstat) {
    var svc = this;

    svc.getBatterHistory = function(mlbid) {
      var filter = {};
      if (mlbid) {
        //filter = {
        //  'filter[where][name]':"Jose Abreu"
        //};
        filter = {
          filter: { where: { mlbid: mlbid } }
        };
        //filter = {
        //  'filter[where][name]':"Jose Abreu"
        //};
      }
      return Dailybatterstat.find(filter)
      .$promise
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        $log.debug('bad get Batter History', error);
      });
    };
    svc.getPitcherHistory = function(mlbid) {
      var filter = {};
      if (mlbid) {
        filter = {
          'filter[where][mlbid]':mlbid
        };
      }
      return Dailypitcherstat.find(filter)
        .$promise
        .then(function(response) {
          return response;
        })
        .catch(function(error) {
          $log.debug('bad get Batter History', error);
        });
    };


    svc.processRosterTotals = function(latestTotals) {
      var rosterSlug = latestTotals.roster;
      var filter = {
        'filter[where][roster]':rosterSlug,
        'filter[order]':'grandTotal DESC'
      };
      Totals.find(filter)
        .$promise
        .then(function (results) {
          // process the totals against the new ones
          // get the latest totals
          $log.debug('totals: ' + results);
          // if there are no totals then create them
          var bInsert = true;
          //if (results.length === 0) {
          //  Totals.create(latestTotals);
          //}
          if (results.length > 0) {
            // get the current highest grandTotal
            if (latestTotals.grandTotal > results[0].grandTotal) {
              $log.debug('creating new total record');
              var insertObj = latestTotals;

              Totals.create(latestTotals);
            }
          }
          else {
            // first update of the year
            Totals.create(latestTotals);
          }

            // there is at least one result

          // iterate to get the last update timestamp
          // get the timestamp for now
          // compare for each
          // if there is a delta then create the record

        })
        .catch(function(error) {
          $log.warn('StatsServices - processRosterTotals: ' + error.message);
        });
    };


    return svc;

  }
]);

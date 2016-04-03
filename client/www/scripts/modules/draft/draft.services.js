Draft.service('DraftServices', [
  '$log',
  'Draftpick',
  'socket',
  function($log, Draftpick, socket) {
    var svc = this;
    svc.getDraftBoard = function(filter) {
      if (!filter) {
        filter = {};
      }
      return Draftpick.find(filter)
        .$promise
        .then(function(response) {
          return response;
        })
        .catch(function(error) {

        });
    };
    svc.updateDraftPick = function(pick) {
      if (pick.id && pick.roster) {
        delete pick._id;
        return Draftpick.upsert(pick,
          function(response){
            socket.emit('draftPickUpdate', pick);

            return response;

          },
          function(error){
            $log.warn('bad update pick: ', error);
          }
        );

      }
    };




    return svc;
  }
]);

/**
 * Created by seanbrookes on 2014-03-27.
 */
Draft.service('DraftService',[
  'Draft',
  'Draftpick',
  function(Draft, Draftpick){
    "use strict";

    var svc = {api:{}};
    svc.api.Draft = Draft;
    svc.addDraftSlot = function(slot){

      return DraftPick.create(slot,
        function(response){
          console.log('added draft slot');
        },
        function(response){
          console.log('error adding draft slot');
        }

      );

    };

    return svc;

  }

]);
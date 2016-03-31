/**
 * Created by seanbrookes on 2014-03-27.
 */
Draft.controller('DraftMainController',[
  '$scope',
  'Draftpick',
  '$timeout',
  'RosterService',
  '$log',
  function($scope, Draftpick, $timeout, RosterService, $log){
    console.log('Draft Main Controller');

    $scope.ePlayer = {status:'drafted'};

    $scope.draftPicks = Draftpick.query({},
      function(response){
        //console.log('good get Draftpicks: ' + response);
      },
      function(respeonse){
        console.log('bad get draftpics');
      }
    );
    $scope.editPick = function(pick){
      console.log('edit pick: ' + JSON.stringify(pick));
      $scope.showPickForm = true;
      $scope.ePick = pick;
    };
//    $scope.deletePick = function(pick){
//      delete pick._id;
//      console.log('test delete');
//      Draftpick.deleteById({"id":pick.id},
//        function(response){
//          console.log('good delete pick');
//          $scope.draftPicks = Draftpick.query({},
//            function(response){
//              //console.log('good get Draftpicks: ' + response);
//            },
//            function(respeonse){
//              console.log('bad get draftpics');
//            }
//          );
//        },
//        function(response){
//          console.log('bad delete');
//        }
//
//      );
//    };
    $scope.showPickForm = false;
    $scope.savePick = function(pick){
      console.log('save pick: ' + JSON.stringify(pick));

      pick.pickTime = Date.now();

      delete pick._id;
      Draftpick.upsert(pick,
        function(response){
          console.log('Update the pick: ' + JSON.stringify(response));
          //$scope.editMode = false;
          //alert('TOAST: success update pick');

          $scope.ePick = {};
          $scope.showPickForm = false;

        },
        function(response){
          console.log('bad update pick: ' + JSON.stringify(response));
        }
      );


    };

    $scope.saveDraftBoardPlayer = function() {
      $log.debug('save draft Board player: ' + JSON.stringify($scope.ePlayer));

      // get the roster
      return RosterService.getRoster($scope.ePlayer.slug)
        .then(function(roster) {
          roster.players.push($scope.ePlayer);
          return RosterService.updateRoster(roster)
            .$promise
                  .then(function(response) {
                    $log.debug('added player');
                    $scope.ePlayer = {status: 'drafted'};
                    return;
                  });
                });
      // add player to the players array
      // save the roster





     // $scope.ePlayer = {};
    };
    $scope.isDog = function(){
      if(localStorage.getItem('homeRoster')){
        if (localStorage.getItem('homeRoster') === 'dog'){
          return true;
        }
        return false;
      }
      return false;
    };

    function updateBoard(){
      console.log('test');
      $scope.draftPicks = Draftpick.query({},
        function(response){
          //console.log('good get Draftpicks: ' + response);
        },
        function(respeonse){
          console.log('bad get draftpics');
        }
      );
    }
  //  var timer = setInterval(updateBoard, 42000);




    function giverShit(data){
      console.log('ed ide:  ' + JSON.stringify(data));
    }

    $scope.draftGridOptions = {
      data: 'draftPicks',
      enableCellSelection: true,
      enableRowSelection: false,
      enableCellEditOnFocus: true,
      ngGridEventEndCellEdit: giverShit,
      columnDefs: [
        {
          field:'pickNumber',
          displayName:'pk'
        },
        {
          field:'round',
          displayName:'rnd'
        },
        {
          field:'roster',
          displayName:'roster',
          enableCellEdit: true
        },
        {
          field:'player',
          displayName:'player',
          enableCellEdit: true
        },
        {
          field:'pos',
          displayName:'pos',
          enableCellEdit: true
        },
        {
          field:'team',
          displayName:'team',
          enableCellEdit: true
        }
      ]

    };


  }
]);

Draft.controller('GenListController',[
  '$scope',
  'Draftpick',
  function($scope, Draftpick){
    console.log('Generate Draft List');
    var roundIndex = 1;
    var pickIndex = 1;
    var rosterArray = ['bashers','rallycaps','mashers','stallions','stallions','mashers','rallycaps','bashers'];



    for (var i = 0;i < 12;i++){
      for (var j = 0;j < rosterArray.length;j++){
        if (j === 4){
          roundIndex++;
        }

        console.log('[' + roundIndex + '][' + pickIndex + ']' + rosterArray[j]);
//        var draftSlot = {
//
//        };
        var dpObj = {
          pickNumber: pickIndex,
          round: roundIndex,
          roster: rosterArray[j]
        };
        //Draftpick.create(dpObj,
        //  function(response){
        //    console.log('good add draft pick');
        //  },
        //  function(response){
        //    console.log('bad add draft pick');
        //  }
        //);
        pickIndex++;

        if (j === 7){
          roundIndex++;
        }
      }
    }

  }
]);

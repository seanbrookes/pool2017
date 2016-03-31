Common.directive('bbpTotalsChart', [
  function() {
    return  {
      restrict: 'E',
      template: '<svg id="visualisation" width="1000" height="500"></svg>',
      controller: [
        '$scope',
        '$log',
        'Totals',
        function($scope, $log, Totals) {
          $scope.chartTotals = Totals.query({})
            .$promise
            .then(function(totalsCollection) {
              $log.debug('totalsCollection');
              /*
              *
              * each roster:
              * - date
              * - grandTotal
              *
              * Date
              * Roster
              * grandTotal
              *
              * */
              $scope.chartTotals = {
                bashersTotals: [],
                mashersTotals: [],
                rallyCapsTotals: [],
                stallionsTotals: []
              };
            //  var parseDate = d3.time.format("%Y%m%d").parse;
            //  function getDate(d) {
            //    return new Date(d.jsonDate);
            //  }
              totalsCollection.map(function(totalItem) {
                switch(totalItem.roster) {
                  case 'bashers':
                    $scope.chartTotals.bashersTotals.push({
                      date:new Date(totalItem.date),
                      grandTotal:totalItem.grandTotal,
                      starterTotal:totalItem.starterTotal,
                      closerTotal:totalItem.closerTotal,
                      batterTotal:totalItem.batterTotal
                    });

                    break;

                  case 'mashers':
                    $scope.chartTotals.mashersTotals.push({
                      date:new Date(totalItem.date),
                      grandTotal:totalItem.grandTotal,
                      starterTotal:totalItem.starterTotal,
                      closerTotal:totalItem.closerTotal,
                      batterTotal:totalItem.batterTotal
                    });

                    break;

                  case 'rallycaps':
                    $scope.chartTotals.rallyCapsTotals.push({
                      date:new Date(totalItem.date),
                      grandTotal:totalItem.grandTotal,
                      starterTotal:totalItem.starterTotal,
                      closerTotal:totalItem.closerTotal,
                      batterTotal:totalItem.batterTotal
                    });

                    break;

                  case 'stallions':
                    $scope.chartTotals.stallionsTotals.push({
                      date:new Date(totalItem.date),
                      grandTotal:totalItem.grandTotal,
                      starterTotal:totalItem.starterTotal,
                      closerTotal:totalItem.closerTotal,
                      batterTotal:totalItem.batterTotal
                    });

                    break;

                  default:

                }
              });


              var dateRange1 = $scope.chartTotals.stallionsTotals[0].date;
              var dateRange2 = $scope.chartTotals.stallionsTotals[$scope.chartTotals.stallionsTotals.length - 1].date;
              // create and render the chart
              var vis = d3.select("#visualisation"),
                WIDTH = 1000,
                HEIGHT = 500,
                MARGINS = {
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 50
                },
                xScale = d3.time.scale()
                  .range([MARGINS.left, WIDTH - MARGINS.right])
                  .domain([dateRange1, dateRange2]),
                yScale = d3.scale.linear()
                  .range([HEIGHT - MARGINS.top, MARGINS.bottom])
                  .domain([0, $scope.chartTotals.stallionsTotals[$scope.chartTotals.stallionsTotals.length - 1].grandTotal]),
                xAxis = d3.svg.axis()
                  .scale(xScale),
                yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left");

              vis.append("svg:g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
                .call(xAxis);
              vis.append("svg:g")
                .attr("class", "y axis")
                .attr("transform", "translate(" + (MARGINS.left) + ",0)")
                .style({ 'stroke': '#444444', 'fill': 'none', 'stroke-width': '1px'})
                .call(yAxis);




              var lineGen = d3.svg.line()
                .x(function(d) {
                  return xScale(d.date);
                })
                .y(function(d) {
                  return yScale(d.grandTotal);
                })
                .interpolate("basis");
              vis.append('svg:path')
                .attr('d', lineGen($scope.chartTotals.mashersTotals))
                .attr('stroke', 'green')
                .attr('stroke-width', 2)
                .attr('fill', 'none');
              vis.append('svg:path')
                .attr('d', lineGen($scope.chartTotals.bashersTotals))
                .attr('stroke', 'blue')
                .attr('stroke-width', 2)
                .attr('fill', 'none');
              vis.append('svg:path')
                .attr('d', lineGen($scope.chartTotals.rallyCapsTotals))
                .attr('stroke', 'red')
                .attr('stroke-width', 2)
                .attr('fill', 'none');
              vis.append('svg:path')
                .attr('d', lineGen($scope.chartTotals.stallionsTotals))
                .attr('stroke', 'grey')
                .attr('stroke-width', 2)
                .attr('fill', 'none');


              var pl = vis.append('g')
                .attr('class', 'legend');
              // BASHERS
              pl.append('rect')
                .attr('x',  WIDTH - 200)
                .attr('y', 200)
                .attr('width', 20)
                .attr('height', 20)
                .style('fill', function(d) {
                  return 'blue';
                });
              pl.append('text')
                .attr('x', WIDTH - 170)
                .attr('y', HEIGHT - 285)
                .attr('width', 200)
                .attr('height', 20)
                .text(function(d){ return 'Bashers'; })
                .style('fill', function(d) {
                  return 'orange';
                });
              // MASHERS
              pl.append('rect')
                .attr('x',  WIDTH - 200)
                .attr('y', 230)
                .attr('width', 20)
                .attr('height', 20)
                .style('fill', function(d) {
                  return 'green';
                });
              pl.append('text')
                .attr('x', WIDTH - 170)
                .attr('y', HEIGHT - 255)
                .attr('width', 200)
                .attr('height', 20)
                .text(function(d){ return 'Mashers'; })
                .style('fill', function(d) {
                  return 'orange';
                });
              // RALLY CAPS
              pl.append('rect')
                .attr('x',  WIDTH - 200)
                .attr('y', 260)
                .attr('width', 20)
                .attr('height', 20)
                .style('fill', function(d) {
                  return 'red';
                });
              pl.append('text')
                .attr('x', WIDTH - 170)
                .attr('y', HEIGHT - 225)
                .attr('width', 200)
                .attr('height', 20)
                .text(function(d){ return 'Rally Caps'; })
                .style('fill', function(d) {
                  return 'orange';
                });
              // STALLIONS
              pl.append('rect')
                .attr('x',  WIDTH - 200)
                .attr('y', 290)
                .attr('width', 20)
                .attr('height', 20)
                .style('fill', function(d) {
                  return 'grey';
                });
              pl.append('text')
                .attr('x', WIDTH - 170)
                .attr('y', HEIGHT - 195)
                .attr('width', 200)
                .attr('height', 20)
                .text(function(d){ return 'Stallions'; })
                .style('fill', function(d) {
                  return 'orange';
                });
             });
        }
      ],
      link: function(scope, el, attrs) {

      }
    }
  }
]);
Common.directive('grandTotalsSummaryList', [
  'Totals',
  function(Totals){
    return{
      restrict: 'E',
      templateUrl: './scripts/modules/common/templates/totals.list.html',
      replace: true,
      controller:[
        '$scope',
        function($scope){
          var filter = {
            'filter[order]':'date DESC'
          };

          var initTotals = Totals.query(filter);
          initTotals
            .$promise
            .then(function (result) {
              var beginArray = result;
              var returnArray = [];

              var totalsComparitorObj = {
                bashers:{
                  latest:{
                    grandTotal:0,
                    hitterTotal:0,
                    starterTotal:0,
                    closerTotal:0
                  },
                  previous:{
                    grandTotal:0,
                    hitterTotal:0,
                    starterTotal:0,
                    closerTotal:0
                  }
                },
                mashers:{
                  latest:{
                    grandTotal:0,
                    hitterTotal:0,
                    starterTotal:0,
                    closerTotal:0
                  },
                  previous:{
                    grandTotal:0,
                    hitterTotal:0,
                    starterTotal:0,
                    closerTotal:0
                  }
                },
                rallycaps:{
                  latest:{
                    grandTotal:0,
                    hitterTotal:0,
                    starterTotal:0,
                    closerTotal:0
                  },
                  previous:{
                    grandTotal:0,
                    hitterTotal:0,
                    starterTotal:0,
                    closerTotal:0
                  }
                },
                stallions:{
                  latest:{
                    grandTotal:0,
                    hitterTotal:0,
                    starterTotal:0,
                    closerTotal:0
                  },
                  previous:{
                    grandTotal:0,
                    hitterTotal:0,
                    starterTotal:0,
                    closerTotal:0
                  }
                }

              };
              var latestDate;
              var previousDate;
              var rosterChecklist = [];
              for (var i = 0;i  <  beginArray.length;i++){
                var currTotalRecord = beginArray[i];
                if (!latestDate){
                  latestDate = beginArray[0].date;
                  previousDate = moment(latestDate).subtract('days',1).format('YYYY-MM-DD');
                  console.log('dates: ' + latestDate + ':' + moment(previousDate).format('YYYY-MM-DD'));
                }
                var bBashersDeltaCalculated = false;
                var bBashersTotalCalculated = false;
                var bMashersDeltaCalculated = false;
                var bMashersTotalCalculated = false;
                var bRallycapsDeltaCalculated = false;
                var bRallycapsTotalCalculated = false;
                var bStallionsDeltaCalculated = false;
                var bStallionsTotalCalculated = false;

                switch(currTotalRecord.roster){

                  case 'bashers':
                    if (currTotalRecord.date === latestDate){
                      if (!totalsComparitorObj.bashers.latest.date) {
                        bBashersTotalCalculated = true;

                        totalsComparitorObj.bashers.latest.date = currTotalRecord.date;
                        totalsComparitorObj.bashers.latest.grandTotal = currTotalRecord.grandTotal;
                        totalsComparitorObj.bashers.latest.hitterTotal = currTotalRecord.hitterTotal;
                        totalsComparitorObj.bashers.latest.starterTotal = currTotalRecord.starterTotal;
                        totalsComparitorObj.bashers.latest.closerTotal = currTotalRecord.closerTotal;
                      }
                    }
                    if (!bBashersDeltaCalculated && (currTotalRecord.date !== latestDate)){
                      if (!totalsComparitorObj.bashers.previous.date){
                        bBashersDeltaCalculated = true;
                        totalsComparitorObj.bashers.previous.date = currTotalRecord.date;
                        totalsComparitorObj.bashers.previous.grandTotal = currTotalRecord.grandTotal;
                        totalsComparitorObj.bashers.previous.hitterTotal = currTotalRecord.hitterTotal;
                        totalsComparitorObj.bashers.previous.starterTotal = currTotalRecord.starterTotal;
                        totalsComparitorObj.bashers.previous.closerTotal = currTotalRecord.closerTotal;


                      }
                    }
                    break;
                  case 'mashers':
                    if (currTotalRecord.date === latestDate){
                      if (!totalsComparitorObj.mashers.latest.date){
                        bMashersTotalCalculated = true;
                        totalsComparitorObj.mashers.latest.date = currTotalRecord.date;
                        totalsComparitorObj.mashers.latest.grandTotal = currTotalRecord.grandTotal;
                        totalsComparitorObj.mashers.latest.hitterTotal = currTotalRecord.hitterTotal;
                        totalsComparitorObj.mashers.latest.starterTotal = currTotalRecord.starterTotal;
                        totalsComparitorObj.mashers.latest.closerTotal = currTotalRecord.closerTotal;
                      }
                    }
                    if (!bMashersDeltaCalculated && (currTotalRecord.date !== latestDate)){
                      if (!totalsComparitorObj.mashers.previous.date){
                        bMashersDeltaCalculated = true;
                        totalsComparitorObj.mashers.previous.date = currTotalRecord.date;
                        totalsComparitorObj.mashers.previous.grandTotal = currTotalRecord.grandTotal;
                        totalsComparitorObj.mashers.previous.hitterTotal = currTotalRecord.hitterTotal;
                        totalsComparitorObj.mashers.previous.starterTotal = currTotalRecord.starterTotal;
                        totalsComparitorObj.mashers.previous.closerTotal = currTotalRecord.closerTotal;
                      }
                    }
                    break;
                  case 'rallycaps':
                    if (currTotalRecord.date === latestDate){
                      if (!totalsComparitorObj.rallycaps.latest.date){
                        bRallycapsTotalCalculated = true;
                        totalsComparitorObj.rallycaps.latest.date = currTotalRecord.date;
                        totalsComparitorObj.rallycaps.latest.grandTotal = currTotalRecord.grandTotal;
                        totalsComparitorObj.rallycaps.latest.hitterTotal = currTotalRecord.hitterTotal;
                        totalsComparitorObj.rallycaps.latest.starterTotal = currTotalRecord.starterTotal;
                        totalsComparitorObj.rallycaps.latest.closerTotal = currTotalRecord.closerTotal;
                      }
                    }
                    if (!bRallycapsDeltaCalculated && (currTotalRecord.date !== latestDate)){
                      if (!totalsComparitorObj.rallycaps.previous.date){
                        bRallycapsDeltaCalculated = true;
                        totalsComparitorObj.rallycaps.previous.date = currTotalRecord.date;
                        totalsComparitorObj.rallycaps.previous.grandTotal = currTotalRecord.grandTotal;
                        totalsComparitorObj.rallycaps.previous.hitterTotal = currTotalRecord.hitterTotal;
                        totalsComparitorObj.rallycaps.previous.starterTotal = currTotalRecord.starterTotal;
                        totalsComparitorObj.rallycaps.previous.closerTotal = currTotalRecord.closerTotal;
                      }
                    }
                    break;
                  case 'stallions':
                    if (currTotalRecord.date === latestDate){
                      if (!totalsComparitorObj.stallions.latest.date){
                        bStallionsTotalCalculated = true;
                        totalsComparitorObj.stallions.latest.date = currTotalRecord.date;
                        totalsComparitorObj.stallions.latest.grandTotal = currTotalRecord.grandTotal;
                        totalsComparitorObj.stallions.latest.hitterTotal = currTotalRecord.hitterTotal;
                        totalsComparitorObj.stallions.latest.starterTotal = currTotalRecord.starterTotal;
                        totalsComparitorObj.stallions.latest.closerTotal = currTotalRecord.closerTotal;
                      }
                    }
                    if (!bStallionsDeltaCalculated && (currTotalRecord.date !== latestDate)){
                      if (!totalsComparitorObj.stallions.previous.date){
                        bStallionsDeltaCalculated = true;
                        totalsComparitorObj.stallions.previous.date = currTotalRecord.date;
                        totalsComparitorObj.stallions.previous.grandTotal = currTotalRecord.grandTotal;
                        totalsComparitorObj.stallions.previous.hitterTotal = currTotalRecord.hitterTotal;
                        totalsComparitorObj.stallions.previous.starterTotal = currTotalRecord.starterTotal;
                        totalsComparitorObj.stallions.previous.closerTotal = currTotalRecord.closerTotal;
                      }
                    }
                    break;
                  default:



                }
//
//                currTotalRecord.grandTotalDelta = getGrandTotalDelta(currTotalRecord.roster,totalsComparitorObj);
//
//                returnArray.push(currTotalRecord);

              }
              for (var k = 0;k  <  beginArray.length;k++){
                currTotalRecord = beginArray[k];


                currTotalRecord.grandTotalDelta = parseFloat(getGrandTotalDelta(currTotalRecord.roster,totalsComparitorObj)).toFixed(2);

                returnArray.push(currTotalRecord);

              }




              //console.log('COMPARITOR: ' + JSON.stringify(totalsComparitorObj));

              $scope.grandTotals = returnArray;

            }
          );
          var getGrandTotalDelta = function(roster, compObj){
//            return 0;
            if (compObj[roster].previous.grandTotal !== 0){
              return (compObj[roster].latest.grandTotal - compObj[roster].previous.grandTotal);
            }
          }
        }
      ]
    }
  }
]);
Common.directive('bbpAppHeader', [

  function() {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/common/templates/app.header.html',
      replace: true,
      controller: [
        '$scope',
        '$stateParams',
        function($scope, $stateParams) {
          $scope.headerCtx = {};
          $scope.headerCtx.currentRoster = $stateParams.slug;
      }],
      link: function(scope, el, attrs) {


        scope.$watch('bbpCtx.currentRoster', function(newRoster, oldRoster) {
          scope.headerCtx.currentRoster = newRoster;
        }, true);
      }
    }
  }
]);
Common.directive('posRankNavList', [
  function() {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/common/templates/pos.rank.nav.list.html',
      replace: true,
      controller:function(){}
    }
  }
]);
Common.directive('generalTotalsSummaryList', [
  'Totals',
  function(Totals){
    return{
      restrict: 'E',
      templateUrl: './scripts/modules/common/templates/general.totals.html',
      controller:[
        '$scope',
        function($scope){
          var filter = {};

          $scope.rosters = Totals.query(filter);
          $scope.rosters.$promise.
            then(function (result) {
              $scope.rosters = result;

            }
          );


        }
      ]
    }
  }
]);



/**
 * sl-common-enter
 *
 * calls a scope method on click event
 *
 * <input ng-enter="method()" />
 *
 *
 * */
Common.directive('slCommonEnter', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if(event.which === 13) {
        scope.$apply(function (){
          scope.$eval(attrs.slCommonEnter);
        });

        event.preventDefault();
      }
    });
  };
});
 /**
 * sl-common-select-on-click
 *
 * generic attribute directive to autoselect the contents of an input
 * by single clicking the content
 *
 * */
Common.directive('slCommonSelectOnClick', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.on('click', function () {
        this.select();
      });
    }
  };
});
Common.directive('slCommonLoadingIndicator', [
  function() {
    return {
      template: '<span us-spinner="{{props}}"></span>',
      controller: function($scope, $attrs){
        $scope.size = $attrs.size || 'large';

        switch($scope.size){
          case 'small':
            $scope.props = '{radius:6, width:2, length: 4, color:\'#999\'}';
            break;
          case 'large':
          default:
            $scope.props = '{radius:30, width:8, length: 24, color:\'#7DBD33\'}';
            break;
        }
      }
    }
  }
]);

/** @jsx React.DOM */
var d3Chart = {};

d3Chart.create = function(el, props, state) {
  var svg = d3.select(el).append('svg')
    .attr('class', 'd3')
    .attr('width', 600)
    .attr('height', 400);

  svg.append('g')
    .attr('class', 'd3-points');

  this.update(el, state);
};

d3Chart.update = function(el, state) {
  // Re-compute the scales, and render the data points
  var scales = this._scales(el, state.domain);
  this._drawPoints(el, scales, state.data);
};

d3Chart.destroy = function(el) {
  // Any clean-up would go here
  // in this example there is nothing to do
};
d3Chart._scales = function(el, domain) {
  if (!domain) {
    return null;
  }

  var width = el.offsetWidth;
  var height = el.offsetHeight;


  var x = d3.time.scale()
    .range([0, width])
    .domain(domain.x);

  var y = d3.scale.linear()
    .range([height, 0])
    .domain(domain.y);


  return {x: x, y: y};
};
d3Chart._drawPoints = function(el, scales, data) {
  var vis = d3.select(el).selectAll('.d3-points');

  var xAxis = d3.svg.axis()
    .tickFormat(d3.time.format("%m-%d"))
    .ticks(5)
    .scale(scales.x);
  var yAxis = d3.svg.axis()
      .scale(scales.y)
      .orient("left");

  vis.append("svg:g")
    .attr("class", "x axis")
    .call(xAxis);
  vis.append("svg:g")
    .attr("class", "y axis")
    .attr("transform", "translate(50,0)")
    .style({'stroke': '#444444', 'fill': 'none', 'stroke-width': '1px'})
    .call(yAxis);


  var lineGen = d3.svg.line()
    .x(function (d) {
      return scales.x(d.lastUpdate);
    })
    .y(function (d) {
      return scales.y(d.total);
    })
    .interpolate("basis");
  vis.append('svg:path')
    .attr('d', lineGen(data))
    .attr('stroke', 'green')
    .attr('stroke-width', 2)
    .attr('fill', 'none');

};
window.HitterChart = (HitterChart = React).createClass({



  propTypes: {
    data: React.PropTypes.array,
    domain: React.PropTypes.object
  },

  componentDidMount: function() {
    var el = this.getDOMNode();
    d3Chart.create(el, {
      width: '100%',
      height: '300px'
    }, this.getChartState());
  },

  componentDidUpdate: function() {
    var el = this.getDOMNode();
    d3Chart.update(el, this.getChartState());
  },

  getChartState: function() {
    return {
      data: this.props.scope.currentPlayerHistory,
      domain: this.props.scope.domain
    };
  },

  componentWillUnmount: function() {
    var el = this.getDOMNode();
    d3Chart.destroy(el);
  },

  render: function() {
    return (
      <div className="Chart"></div>
    );
  }












  //render:function() {
  //  var component = this;
  //
  //  var items = [];
  //  if (component.props.scope.currentPlayerHistory && component.props.scope.currentPlayerHistory) {
  //    component.props.scope.currentPlayerHistory.map(function(update) {
  //      items.push(<div>{update.total}</div>);
  //    });
  //  }
  //
  //  return (<div>{items}</div>);
  //}
});
window.HitterHistory = (HitterHistory = React).createClass({
  getInitialState: function() {
    return {
      titleSearchValue:''
    }
  },
  componentWillReceiveProps: function(nextProps) {
    var component = this;
    if (!nextProps.scope.titleSearchValue) {
      component.setState({titleSearchValue:nextProps.scope.titleSearchValue});

    }
  },
  editEntity: function(entity) {
    var component = this;
    if (entity) {
      var scope = component.props.scope;
      scope.$apply(function() {
        scope.editEntity(entity);
      });
    }
  },
  deleteEntity: function(entity) {
    var component = this;
    if (entity) {
      var scope = component.props.scope;
      scope.$apply(function() {
        scope.deleteEntity(entity);
      });
    }
  },
  sortIt: function(colName) {
    if (colName) {
      var component = this;
      var scope = component.props.scope;
      scope.$apply(function() {
        scope.sortEntities(colName);
      });
    }
  },
  editTags: function(instance) {
    var component = this;
    if (instance) {
      var scope = component.props.scope;
      scope.$apply(function() {
        scope.editTags(instance);
      });
    }
  },
  addToTwitterList: function(instance) {
    var component = this;
    if (instance) {
      if (confirm('add to twitter list?')) {
        var scope = component.props.scope;
        scope.$apply(function() {
          scope.addToTwitterList(instance);
        });

      }
    }
  },
  editNotes: function(instance) {
    var component = this;
    if (instance) {
      var scope = component.props.scope;
      scope.$apply(function() {
        scope.editNotes(instance);
      });
    }
  },
  getPlayerHistory: function(player) {
    var component = this;
    var scope = component.props.scope;
    scope.$apply(function() {
      scope.getPlayerHistory(player);
    });
  },
  toggleTypeFilter: function() {
    var component = this;
    var scope = component.props.scope;
    scope.$apply(function() {
      scope.toggleEntityTypeFilter();
    });
  },
  clearTitleSearch: function(comp) {
    var component = this;
    var scope = component.props.scope;
    scope.$apply(function() {
      scope.clearTitleSearchInput();
    });
  },
  updateTitleSearchValue: function(event) {
    var component = this;
    component.setState({titleSearchValue: event.target.value});
    var scope = component.props.scope;
    scope.$apply(function() {
      scope.updateTitleSearchValue(component.state.titleSearchValue);
    });
  },
  render: function () {
    var component = this;
    var scope = component.props.scope;

    var entityRowItems = [];
    if (scope.updatedHitterHistory && scope.updatedHitterHistory.map) {
      var index = 0;
      entityRowItems = scope.updatedHitterHistory.map(function(entity) {

        index++;
        return (
          <tr>
          <td className="PrimaryCol">
            <button onClick={component.getPlayerHistory.bind(component, entity)}>
              {index}) {entity.name}
            </button>
            <div className="PlayerChartContainer" id={entity.mlbid}></div>
          </td>
          <td >
            {entity.roster}
          </td>
          <td >
            {entity.r}
          </td>
          <td >
            {entity.h}
          </td>
          <td >
            {entity.hr}
          </td>
          <td >
            {entity.rbi}
          </td>
          <td >
            {entity.sb}
          </td>
          <td >
            {entity.total}
          </td>
          <td>
            {entity.deltaTotal}
          </td>
          <td>
            {moment(entity.lastUpdate).format("MMM-DD-YY")}
          </td>
          <td className="delete-col">
            <button className="CommandButton"  onClick={component.deleteEntity.bind(component, entity)}>
              <span className="glyphicon glyphicon-remove-circle"></span>
            </button>
          </td>
        </tr>
        );
      });
    }


    return (
      <div className="post-summary-list-container">

        <span>count{entityRowItems.length}</span>
        <table className="table table-striped">
          <thead>
          <tr>
            <th>
              <button onClick={component.sortIt.bind(component, 'name')} className="CommandButton">Name</button>
            </th>
            <th>
              <button onClick={component.sortIt.bind(component, 'roster')}  className="CommandButton">Roster</button>

            </th>
            <th>
              <button onClick={component.sortIt.bind(component, 'r')}  className="CommandButton">Runs</button>
            </th>
            <th>
              <button onClick={component.sortIt.bind(component, 'h')}  className="CommandButton">Hits</button>

            </th>
            <th>
              <button onClick={component.sortIt.bind(component, 'hr')}  className="CommandButton">HR</button>

            </th>
            <th>
              <button onClick={component.sortIt.bind(component, 'rbi')}  className="CommandButton">RBI</button>
            </th>
            <th>
              <button onClick={component.sortIt.bind(component, 'sb')}  className="CommandButton">SB</button>
            </th>
            <th>
              <button onClick={component.sortIt.bind(component, 'total')}  className="CommandButton">Total</button>
            </th>
            <th>
              <button onClick={component.sortIt.bind(component, 'deltaTotal')}  className="CommandButton">Delta</button>
            </th>
            <th>
              <button onClick={component.sortIt.bind(component, 'lastUpdate')}  className="CommandButton">Last Update</button>
            </th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {entityRowItems}
          </tbody>
        </table>

      </div>
    );
  }
});

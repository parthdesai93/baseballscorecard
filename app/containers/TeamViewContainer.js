var React = require('react');
var TeamView = require('../components/TeamView');
var BatsmenDetail = require('../components/BatsmenDetail');

var teamStyles={
  teamWrapper:{
    paddingTop : "50px"
  }
}

var TeamViewContainer = React.createClass({
  getInitialState: function(){
    return{
      showDetails: {
        initialRender: true,
        showHomeTeamDetails: false,
        showAwayTeamDetails: false
      },
      batsmen: this.props.batsmen[0]
    }
  },
  handleHomeClick:function(data){
    this.setState({
      showDetails: {
        initialRender: false,
        showHomeTeamDetails: true,
        showAwayTeamDetails: false
      },
      batsmen: this.props.batsmen[0]
    });
  },
  handleAwayClick:function(data){
    this.setState({
      showDetails: {
        initialRender: false,
        showHomeTeamDetails: false,
        showAwayTeamDetails: true
      },
      batsmen: this.props.batsmen[1]
    });
  },
  render: function(){
    return(
      <div>
        <div className="row" style={teamStyles.teamWrapper}>
          <span>
            <TeamView
              handleClick={this.handleHomeClick.bind(null,this.props.batsmen[0])}
              batsmen={this.props.batsmen[0]}
              home={this.props.home}
              showDetails={this.state.showDetails}
            />
          </span>

          <span>
            <TeamView
              handleClick={this.handleAwayClick.bind(null,this.props.batsmen[1])}
              batsmen={this.props.batsmen[1]}
              away={this.props.away}
              showDetails={this.state.showDetails}
            />
          </span>
        </div>
        <div className="row">
          <BatsmenDetail batsmen={this.state.batsmen} />
        </div>
      </div>
    );
  }
});

module.exports = TeamViewContainer;

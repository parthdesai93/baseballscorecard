var React = require('react');
var _ = require('lodash');


var teamStyles={
  homeTeam: {
    marginLeft: "20%",
    fontSize: "30px"
  },
  awayTeam: {
    marginLeft: "50px",
    fontSize: "30px"
  },
  teamWrapper: {
    marginTop: "50px"
  },
  active: {
    color: "blue"
  }
}

function TeamView(props){
  props.showDetails.initialRender || props.showDetails.showHomeTeamDetails
    ? homeStyle = _.merge({},teamStyles.homeTeam,teamStyles.active)
    : homeStyle = teamStyles.homeTeam;

  props.showDetails.showAwayTeamDetails
    ? awayStyle =  _.merge({},teamStyles.awayTeam,teamStyles.active)
    : awayStyle = teamStyles.awayTeam

  return(
    <span>
    {
      props.home
      ? <button className="btn btn-default" style={homeStyle} onClick={props.handleClick}>
          {props.home}
        </button>
      : <span className="btn btn-default"style={awayStyle} onClick={props.handleClick}>
          {props.away}
        </span>
    }
    </span>
  );
}

module.exports = TeamView;

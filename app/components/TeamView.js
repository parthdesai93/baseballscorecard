var React = require('react');
var _ = require('lodash');


var teamStyles={
  homeTeam: {

  },
  awayTeam: {

  },
  teamWrapper: {
    marginTop: "50px"
  },
  active: {
    color: "#489CE4"
  },
  homeButtonWrapper: {
    textAlign: "right"
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
      ? <div className="col-sm-offset-2 col-sm-3 col-xs-5 " style={teamStyles.homeButtonWrapper} >
          <button className="btn btn-default" style={homeStyle} onClick={props.handleClick}>
            {props.home}
          </button>
        </div>
      : <div className="col-sm-3 col-xs-6" >
          <button className="btn btn-default"style={awayStyle} onClick={props.handleClick}>
            {props.away}
          </button>
        </div>
    }
    </span>
  );
}

module.exports = TeamView;

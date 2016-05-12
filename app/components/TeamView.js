var React = require('react');


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
  }
}

function BatsmenDetail(props){
  return(
    <div>
      {
        props.showDetails.showHomeTeamDetails
        ? <div>Batsmen</div>
        : null
      }
    </div>
  )
}

function TeamView(props){
  return(
    <span>
    { props.home
      ? <span style={teamStyles.homeTeam} onClick={props.handleClick}>
          {props.home}
        </span>
      : <span style={teamStyles.awayTeam}onClick={props.handleClick}>
          {props.away}
        </span>
    }
    </span>
  );
}

module.exports = TeamView;

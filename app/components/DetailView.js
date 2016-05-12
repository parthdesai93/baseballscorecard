var React = require('react');
var PropTypes = React.PropTypes;
var _ = require('lodash');

var TeamViewContainer = require('../containers/TeamViewContainer');

var DetailStyles= {
  teamWrapper: {
    fontFamily: "'Roboto', sans-serif",
    paddingBottom: "30px",
    boxShadow: "1px 1px 1px 1px #AEAEAE",
    marginBottom: "20px",
    marginTop: "10px",
  },
  homeTeam: {
    fontWeight: "bolder",
    fontSize: "20px",
    marginTop: "30px"
  },
  awayTeam: {
    fontWeight: "lighter",
    fontSize: "20px"
  },
  score:{
    paddingLeft: "10px",
    width: "0px"
  },
  teams:{
    fontSize: "20px",
    marginTop: "30px"
  },
  names:{
    fontSize: "20px",
    paddingLeft: "5%"
  }
}




function LineScore(props){
  return(
    <span>
      <span className="col-xs-1" style={DetailStyles.score}>
        {props.score}
      </span>
      {
        props.inning === "9"
        ? <span className="col-xs-1" style={DetailStyles.score}>
          {props.runs}
          </span>
        : null
      }
    </span>

  );
}


//ab, r , h , rbi, bb, so, avg
function BatsmenView (props){
  return(
    <div style={DetailStyles.names}>
      {props.batsmen.name_display_first_last}
    </div>
  );
}

function TeamView(props){
  return(
    <TeamViewContainer batsmen={props.batsmen} away={props.away} home={props.home}/>
  );
}

function DetailViewUI(props){
  return(
    <div>
      <div className="row">
        <div >
          <span style={DetailStyles.homeTeam} >
            <div className="col-xs-1 col-xs-offset-1">
              {props.box_score.data.boxscore.home_team_code.toUpperCase()}
            </div>
            {props.box_score.data.boxscore.linescore.inning_line_score.map(function(value){
              return <LineScore key={value.inning} score={value.home} inning={value.inning} runs={props.box_score.data.boxscore.linescore.home_team_runs}/>
            })}
            <br/>
          </span>
          <span style={DetailStyles.awayTeam} >
            <div className="col-xs-1 col-xs-offset-1">
              {props.box_score.data.boxscore.away_team_code.toUpperCase()}
            </div>
            {props.box_score.data.boxscore.linescore.inning_line_score.map(function(value){
              return <LineScore key={value.inning} score={value.away} inning={value.inning} runs={props.box_score.data.boxscore.linescore.away_team_runs}/>
            })}
          </span>
        </div>
      </div>
      <div>
        {
           <TeamViewContainer batsmen={props.box_score.data.boxscore.batting} away={props.box_score.data.boxscore.away_fname} home={props.box_score.data.boxscore.home_fname} />
        }
      </div>
    </div>
  );
}



function DetailView(props){
  return(
    <div>
    {
      props.isLoading === true
      ? <h1> Loading</h1>
      : <DetailViewUI box_score={props.box_score} />
    }

    </div>
  );
}

DetailView.propTypes= {
  detail_data : PropTypes.object.isRequired
}


module.exports = DetailView;

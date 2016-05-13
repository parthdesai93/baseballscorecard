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
    marginTop: "10px"
  },
  awayTeam: {
    fontWeight: "lighter",
    fontSize: "20px"
  },
  score:{
    paddingLeft: "10px",
    width: "0%"
  },
  teams:{
    fontSize: "20px",
    marginTop: "30px"
  },
  names:{
    fontSize: "20px",
    paddingLeft: "5%"
  },
  innings:{
    fontSize: "15px",
    paddingLeft: "10px",
    width: "0%",
    marginTop: "10px",
  },
  linescoreWrapper: {
    textAlign: "right"
  }
}


function DisplayInning(props){
  return(
    props.inning === "1"
    ? <span className="col-xs-1 col-xs-offset-3" style={DetailStyles.innings}>
        {props.inning}
      </span>
    : props.inning === "9"
      ? <span>
          <span className="col-xs-1" style={DetailStyles.innings}>
            {props.inning}
          </span>
          <span className="col-xs-1" style={DetailStyles.innings}>
            R
          </span>
        </span>
      : <span className="col-xs-1" style={DetailStyles.innings}>
          {props.inning}
        </span>
  )
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

function DetailViewUI(props){
  return(
    <div>
      <div className="row">
        {
          props.box_score.data.boxscore.linescore.inning_line_score.map(function(value){
            return <DisplayInning key={value.inning} inning={value.inning} />
          })
        }
      </div>
      <div className="row">
        <div className="linescoreWrapper">
          <div style={DetailStyles.homeTeam} >
            <span className="col-xs-2 col-xs-offset-1" style={DetailStyles.linescoreWrapper}>
              {props.box_score.data.boxscore.home_team_code.toUpperCase()}
            </span>
            {props.box_score.data.boxscore.linescore.inning_line_score.map(function(value){
              return <LineScore key={value.inning} score={value.home} inning={value.inning} runs={props.box_score.data.boxscore.linescore.home_team_runs}/>
            })}
            <br/>
          </div>
          <div style={DetailStyles.awayTeam} >
            <span className="col-xs-2 col-xs-offset-1" style={DetailStyles.linescoreWrapper}>
              {props.box_score.data.boxscore.away_team_code.toUpperCase()}
            </span>
            {props.box_score.data.boxscore.linescore.inning_line_score.map(function(value){
              return <LineScore key={value.inning} score={value.away} inning={value.inning} runs={props.box_score.data.boxscore.linescore.away_team_runs}/>
            })}
          </div>
        </div>
      </div>
      <div>
           <TeamViewContainer batsmen={props.box_score.data.boxscore.batting} away={props.box_score.data.boxscore.away_fname} home={props.box_score.data.boxscore.home_fname} />
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

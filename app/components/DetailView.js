var React = require('react');
var PropTypes = React.PropTypes;
var _ = require('lodash');

var TeamViewContainer = require('../containers/TeamViewContainer');

var DetailStyles= {
  homeTeam: {
    fontWeight: "bolder",
    fontSize: "20px",
    marginTop: "30px",
    paddingLeft: "5%"
  },
  awayTeam: {
    fontWeight: "lighter",
    fontSize: "20px",
    paddingLeft: "5%"
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
    <div>
      <div className="col-sm-1" style={DetailStyles.score}>
        {props.score}
      </div>
      {
        props.inning === "9"
        ? <div className="col-sm-1" style={DetailStyles.score}>
          {props.runs}
          </div>
        : null
      }
    </div>

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
        <div className = "col-sm-12">
          <div style={DetailStyles.homeTeam} >
            <div className="col-sm-1">
              {props.box_score.data.boxscore.home_team_code.toUpperCase()}
            </div>
            {props.box_score.data.boxscore.linescore.inning_line_score.map(function(value){
              return <LineScore key={value.inning} score={value.home} inning={value.inning} runs={props.box_score.data.boxscore.linescore.home_team_runs}/>
            })}

          </div>
          <div style={DetailStyles.awayTeam} >
            <br/>
            <div className="col-sm-1">
              {props.box_score.data.boxscore.away_team_code.toUpperCase()}
            </div>
            {props.box_score.data.boxscore.linescore.inning_line_score.map(function(value){
              return <LineScore key={value.inning} score={value.away} inning={value.inning} runs={props.box_score.data.boxscore.linescore.away_team_runs}/>
            })}
          </div>
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

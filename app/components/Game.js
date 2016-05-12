var React = require('react');
var PropTypes = React.PropTypes;
var DatePicker = require('react-datepicker');


//    background-color: #eeeeee;
// box-shadow: 1px 1px 1px 1px;
var GameStyles = {
  homeTeam: {
    fontWeight : "bold",
    fontSize: "20px",
    marginTop: "10px",
    fontFamily: "'Roboto', sans-serif"
  },
  awayTeam: {
    fontSize:"20px",
    fontWeight: "lighter",
    fontFamily: "'Roboto', sans-serif"

  },
  status:{
    fontSize:"15px",
    fontFamily: "'Roboto', sans-serif"

  },
  score: {
    float: 'right',
    fontFamily: "'Roboto', sans-serif"
  },
  gameWrapper: {
    paddingBottom: "1px",
    marginBottom: "30px",
    boxShadow: "1px 1px 1px 1px #AEAEAE",
    width: "50%"
  },
  gameItemWrapper: {
    borderBottom: "1px solid #ebebeb",
    paddingBottom:"5px",
    cursor: "pointer",
    paddingBottom: "10px"
  }

}

function FavFilter(props){
  return(
    <div className="col-sm-8">
      <form className="form-inline"onSubmit={props.onSubmitFav}>
        <div className="form-group" data-toggle="tooltip" data-placement="bottom" title="Please enter the name of the team without city name. E.g: For Toronto Blue Jays, just enter Blue Jays">
          <input
            className="form-control"
            placeholder = "Blue Jays"
            onChange={props.onUpdateFavTeam}
            value= {props.favTeam}
            type="text" />
        </div>
        <button
          className="btn btn-default"
          type="submit" >
            Save
        </button>
      </form>
    </div>
  )
}

function GameItem(props){
  return(
    <div className="row" onClick={props.handleClick} style={GameStyles.gameItemWrapper}>
      <div className="col-md-7 col-md-offset-2">
        <div style={GameStyles.homeTeam}>
          {props.data.home_team_name}
          {
            props.data.status.status === "Final"
             ? <span style={GameStyles.score}> {props.data.linescore.r.home} </span>
             : null
          }
        </div>
        <div style={GameStyles.awayTeam}>
          {props.data.away_team_name}

          {
            props.data.status.status === "Final"
            ? <span style={GameStyles.score}> {props.data.linescore.r.away} </span>
            : null
          }
        </div>
        <div style={GameStyles.status}>
          {props.data.status.status}
        </div>
      </div>
    </div>
  );
}

function GameUI(props){
  return(
    <div className="container " style={GameStyles.gameWrapper}>
      {
          props.isGameArray
          ? props.data.games.game.map( function(info){
            if(info.status.status.toLowerCase() === "final"){
              return <GameItem key={info.id} data={info} handleClick={props.handleClick.bind(null,info)}/>
            } else {
              return <GameItem key={info.id} data={info} handleClick={null}/>
            }})
          :  <GameItem key={props.data.games.game.id} data={props.data.games.game} handleClick={props.handleClick.bind(null,props.data.games.game)} /> 
      }
    </div>
  );
}

function Game(props) {
    return(
      <div>
        {
          props.isLoading === true
          ? <h1>Loading</h1>
          : <div>
              <DatePicker selected={props.day}
                onChange={props.onChange}
                todayButton={'Today'} />
              <FavFilter onUpdateFavTeam={props.onUpdateFavTeam} favTeam={props.favTeam} onSubmitFav={props.onSubmitFav}/>
              <GameUI data={props.finalData}  handleClick={props.handleClick} isGameArray={props.isGameArray} />
            </div>
        }
      </div>
    );
}

Game.propTypes = {
  gameData: PropTypes.object.isRequired,
  finalData: PropTypes.object.isRequired,
  handleClick : PropTypes.func.isRequired
}

module.exports = Game;

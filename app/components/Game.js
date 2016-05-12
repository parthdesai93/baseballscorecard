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
    <form onSubmit={props.onSubmitFav}>
      <div className="form-group">
          <input
            className="form-control"
            placeholder = "Blue Jays"
            onChange={props.onUpdateFavTeam}
            value= {props.favTeam}
            type="text" />
        </div>
    </form>
  )
}

function GameItem(props){
  return(
    <div className="row" onClick={props.handleClick} style={GameStyles.gameItemWrapper}>
      <div className="col-sm-4 col-sm-offset-4">
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
  // console.log(props.data.games.game.game_data_directory);
  return(
    <div className="container " style={GameStyles.gameWrapper}>
      {props.data.games.game.map( function(info){
        return <GameItem key={info.id} data={info} handleClick={props.handleClick.bind(null,info)}/>
      })}
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
              <FavFilter onUpdateFavTeam={props.onUpdateFavTeam} favTeam={props.favTeam}/>
              <GameUI data={props.finalData}  handleClick={props.handleClick}/>
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

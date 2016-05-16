var React = require('react');
var PropTypes = React.PropTypes;
var DatePicker = require('react-datepicker');
var moment = require('moment');
var radium = require('radium');


var GameStyles = {
  homeTeam: {
    fontSize: "20px",
    marginTop: "10px",
    fontFamily: "'Roboto', sans-serif"
  },
  awayTeam: {
    fontSize:"20px",
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
    marginTop: "20px"
  },
  gameItemWrapper: {
    borderBottom: "1px solid #ebebeb",
    paddingBottom:"5px",
    cursor: "pointer",
    paddingBottom: "10px",

  },
  favFilterWrapper: {
    marginTop: "10px",
    paddingRight: "0px"
  },
  datePickerWrapper: {
    marginTop: "10px",
    paddingLeft: "0px"
  },
  gamesNotFound: {
    marginTop : "15px",
    marginBottom: "15px",
    color: "#b3b3b3"
  },
  dateWrapper: {
    marginTop: "15px",
    textAlign: "center",
    fontSize: "20px"
  },
  winner: {
    fontWeight: "bold"
  },
  loser: {
    fontWeight: "lighter"
  },
  leftArrow: {
    marginTop: "15px",
    cursor: "pointer"
  },
  rightArrow: {
    marginTop: "15px",
    textAlign: "center",
    cursor: "pointer"
  }
}

var month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function FavFilter(props){
  return(
    <div className="col-xs-4 col-sm-3 col-xs-offset-4 col-sm-offset-4" style={GameStyles.favFilterWrapper}>
      <div className="pull-right">
        <form className="form-inline" onSubmit={props.onSubmitFav}>
          <div className="input-group">
            <span className="form-group" data-toggle="tooltip" data-placement="bottom" title="Please enter the name of the team without city name. E.g: For Toronto Blue Jays, just enter Blue Jays">
              <input
                className="form-control"
                placeholder = "Blue Jays"
                onChange={props.onUpdateFavTeam}
                value= {props.favTeam}
                type="text" />
            </span>
            <span className="input-group-btn">
              <button
                className="btn btn-default"
                type="submit" >
                  Save
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

function GameItem(props){
  if(props.data.status.status === "Final"){
    props.data.linescore.r.home > props.data.linescore.r.away
      ?  home = _.merge({},GameStyles.homeTeam, GameStyles.winner)
      : home = _.merge({},GameStyles.homeTeam, GameStyles.loser)


    props.data.linescore.r.away > props.data.linescore.r.home
      ? away = _.merge({},GameStyles.awayTeam, GameStyles.winner)
      : away = _.merge({},GameStyles.awayTeam, GameStyles.loser)
  } else {
    home = GameStyles.homeTeam
    away = GameStyles.awayTeam
  }
  return(
    <div className="row" onClick={props.handleClick} style={GameStyles.gameItemWrapper}>
    {
      props.isEmpty === "true"
      ?
        <div className="col-md-7 col-md-offset-2" style={GameStyles.gamesNotFound}>
          <h1> {props.data} </h1>
        </div>
      :
        <div className="col-md-7 col-md-offset-2">
            <div style={home}>
              {props.data.home_team_name}
              {
                props.data.status.status === "Final"
                 ? <span style={GameStyles.score}> {props.data.linescore.r.home} </span>
                 : null
              }
            </div>
            <div style={away}>
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
      }
    </div>
  );
}
function GameItemEmpty(props){
  return(
    <div style={GameStyles.gamesNotFound}>
      Looks like there were no games today
    </div>
  )
}

function GameUI(props){
   return(
    <div className="col-xs-10 col-sm-offset-1 col-xs-offset-1" style={GameStyles.gameWrapper}>
      {
          props.isEmpty
          ? <GameItemEmpty  data={"Sorry, no games were found for this day"} isEmpty={props.isEmpty} />
          : props.isGameArray
            ? props.data.games.game.map( function(info){
              if(info.status.status.toLowerCase() === "final"){
                return <GameItem key={info.id} data={info} handleClick={props.handleClick.bind(null,info)} isEmpty={props.isEmpty}/>
              } else {
                return <GameItem key={info.id} data={info} handleClick={null} isEmpty={props.isEmpty}/>
              }})
          :props.isEmpty
            ? <GameItem key={1} data={"Sorry, no games were found for this day"} isEmpty={props.isEmpty} />
            : <GameItem key={props.data.games.game.id} data={props.data.games.game} handleClick={props.handleClick.bind(null,props.data.games.game)} isEmpty={props.isEmpty} />
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
          : <div className="container">
              <div className ="row">
                <div className ="col-xs-2 col-sm-3 col-xs-offset-1 " style={GameStyles.datePickerWrapper}>
                  <DatePicker selected={props.day}
                    onChange={props.onChange}
                    todayButton={'Today'}
                    className='form-control'
                    />
                </div>
                <FavFilter onUpdateFavTeam={props.onUpdateFavTeam} favTeam={props.favTeam} onSubmitFav={props.onSubmitFav}/>
              </div>
              <div className="row">
                <div className="col-xs-2 col-sm-1 col-xs-offset-2 col-sm-offset-4" style={GameStyles.leftArrow} onClick={props.onPrevDay}>
                  <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                </div>
                <div className="col-xs-4 col-sm-2" style={GameStyles.dateWrapper}>
                   {month[props.date.month()]} {props.date.date()}, {props.date.year()}
                </div>
                <div className="col-xs-3 col-sm-1" style={GameStyles.rightArrow} onClick={props.onNextDay}>
                  <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                </div>
                </div>
              <div className="row">
                <GameUI data={props.finalData}  handleClick={props.handleClick} isGameArray={props.isGameArray} isEmpty={props.isEmpty} isLoading={props.isLoading}/>
              </div>
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

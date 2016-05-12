var React = require('react');
var DatePicker = require('react-datepicker');
var moment = require('moment');
var _ = require('lodash');
require('react-datepicker/dist/react-datepicker.css');
var Game = require('../components/Game');
var ScoreHelper = require('../helpers/gd2Helper');

var api_data = {
  "data" : {
    "games" : {
      "game" : [{
        "home_team_name": "Team 1",
        "away_team_name" : "Team 2",
        "status": "final",
        "detail" : "data`",
        "id" : 1
      },{
        "home_team_name": "Team 3",
        "away_team_name" : "Team 4",
        "status": "final",
        "detail" : "data2",
        "id" : 2
      },{
        "home_team_name": "Team 5",
        "away_team_name" : "Team 6",
        "status": "final",
        "detail" : "data3",
        "id" : 3
      }]
    }
  }
};

var GameContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      data : api_data,
      final_data: {},
      isLoading: true,
      favTeam: "",
      date: moment(),
      isGameArray: true
    }
  },
  componentDidMount: function() {
    this.makeRequest(this.state.date);
  },
  makeRequest: function(date) {
   ScoreHelper.getScore(date,this.state.favTeam)
      .then(function(info){
        this.setState({
          final_data: info.data,
          isLoading: false,
          isGameArray: _.isArray(info.data.data.games.game)
        });
      }.bind(this));

  //  console.log(_.isArray(this.state.final_data.data.games.game));
  },
  handleClick: function (data) {
    this.context.router.push({
      pathname: '/detail',
      state: {
        data: data
      }
    })
  },
  handleChange: function(date){
    this.setState({
      date: date
    });
    this.makeRequest(date);
  },
  handleUpdateFavTeam: function(e){
    this.setState({
      favTeam : e.target.value
    })
  },
  handleSubmitFavTeam: function(){
    this.setState({
      final_data: ScoreHelper.sortFavTeam(this.state.final_data, this.state.favTeam)
    })
  },
  render: function() {
    return(
      <Game
        gameData={this.state.data}
        finalData={this.state.final_data.data}
        handleClick={this.handleClick}
        isLoading={this.state.isLoading}
        onChange={this.handleChange}
        day={this.state.date}
        onUpdateFavTeam={this.handleUpdateFavTeam}
        favTeam={this.state.favTeam}
        onSubmitFav={this.handleSubmitFavTeam}
        isGameArray={this.state.isGameArray}/>
    );
  }
});

module.exports = GameContainer;

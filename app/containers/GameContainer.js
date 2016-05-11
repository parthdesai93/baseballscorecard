var React = require('react');
var DatePicker = require('react-datepicker');
var moment = require('moment');
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
      date: moment()
    }
  },
  componentDidMount: function() {
    this.makeRequest(this.state.date);
  },
  makeRequest: function(date) {
   ScoreHelper.getScore(date)
      .then(function(info){
        this.setState({
          final_data: info.data,
          isLoading: false
        });
      }.bind(this))
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
  render: function() {
    return(
      <Game
        gameData={this.state.data}
        finalData={this.state.final_data}
        handleClick={this.handleClick}
        isLoading={this.state.isLoading}
        onChange={this.handleChange}
        day={this.state.date}
        onUpdateFavTeam={this.handleUpdateFavTeam}
        favTeam={this.state.favTeam}/>
    );
  }
});

module.exports = GameContainer;

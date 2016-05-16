var React = require('react');
var DatePicker = require('react-datepicker');
var moment = require('moment');
var _ = require('lodash');
var Radium = require('radium');
require('react-datepicker/dist/react-datepicker.css');
var Game = require('../components/Game');
var ScoreHelper = require('../helpers/gd2Helper');



var GameContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      final_data: {},
      isLoading: true,
      favTeam: "",
      date: moment(),
      isGameArray: true,
      isEmpty: false
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
          isGameArray: _.isArray(info.data.data.games.game),
          isEmpty: !_.has(info.data.data.games, 'game')
        });
      }.bind(this));
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
      date: date,
      isLoading: true
    });
    setTimeout(function(){
      this.makeRequest(this.state.date);
    }.bind(this),100)

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
  handleNextDay: function(){
    this.setState({
      date: this.state.date.add(1,'day')
    });
    setTimeout(function() {
      this.makeRequest(this.state.date)
    }.bind(this),100);
  },
  handlePrevDay: function(){
    this.setState({
      date: this.state.date.subtract(1,'day')
    });
    setTimeout(function() {
      this.makeRequest(this.state.date)
    }.bind(this),100);
  },
  render: function() {
    return(
      <Game
        finalData={this.state.final_data.data}
        handleClick={this.handleClick}
        isLoading={this.state.isLoading}
        onChange={this.handleChange}
        day={this.state.date}
        onUpdateFavTeam={this.handleUpdateFavTeam}
        favTeam={this.state.favTeam}
        onSubmitFav={this.handleSubmitFavTeam}
        isGameArray={this.state.isGameArray}
        isEmpty={this.state.isEmpty}
        date={this.state.date}
        onNextDay={this.handleNextDay}
        onPrevDay={this.handlePrevDay}/>
    );
  }
});

module.exports = GameContainer;

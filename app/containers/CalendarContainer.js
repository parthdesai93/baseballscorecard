var React = require('react');
var DatePicker = require('react-datepicker');
var moment = require('moment');
require('react-datepicker/dist/react-datepicker.css');

var ScoreHelper = require('../helpers/gd2Helper');


var CalendarContainer = React.createClass({
  getInitialState: function(){
    return{
      day: moment(),
      data: {},
      isLoading: true
    }
  },
  handleChange: function(date) {
    this.setState({
      day: date
    });
    this.makeRequest(date);
  },
  makeRequest: function(date){
    ScoreHelper.testing(date)
      .then(function(data){
        this.setState({
          data: data,
          isLoading: false
        })
      });
  },
  render: function() {
    return <DatePicker
        selected={this.state.day}
        onChange={this.handleChange} />;
  }
});

module.exports = CalendarContainer;

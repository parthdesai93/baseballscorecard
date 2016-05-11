var React = require('react');
var Home = require('../components/Home');

var HomeContainer = React.createClass({
  getInitialState: function() {
    return {
      date : ""
    };
  },
  componentDidMount: function() {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      console.log("dd : " + dd + "mm : " + mm);
      this.setState({
        date: today
      })
  },
  render: function() {
    return(
      <Home fav="blue jays"/>
    );
  }
});

module.exports = HomeContainer;

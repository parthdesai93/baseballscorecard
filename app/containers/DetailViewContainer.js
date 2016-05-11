var React = require('react');

var DetailView = require('../components/DetailView');
var ScoreHelper = require('../helpers/gd2Helper');

var DetailViewContainer = React.createClass({
  getInitialState: function(){
    return{
      detail_data: this.props.location.state.data,
      box_score: {},
      isLoading: true
    }
  },
  componentDidMount:function() {
    this.makeRequest(this.state.detail_data.game_data_directory);
  },
  makeRequest:function(game_data_directory){
    ScoreHelper.getBoxScore(game_data_directory)
      .then(function(data){
        this.setState({
          box_score: data,
          isLoading: false
        })
      }.bind(this));
  },
  render: function() {
    return(
      <DetailView
        detail_data={this.state.detail_data}
        isLoading={this.state.isLoading}
        box_score={this.state.box_score}
        />
    );
  }
});

module.exports = DetailViewContainer;

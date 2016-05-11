var React = require('react');
//{this.props.children}


var Main = React.createClass({
  render: function() {
    return(
      <div>
      {this.props.children}
      </div>
    )
  }
});

module.exports = Main;

var React = require('react');

var Main = React.createClass({
  render: function() {
    return(
      <div>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
});

module.exports = Main;

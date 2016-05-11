var React = require('react');

var homeStyle =  {
  textAlign: 'center',
  marginTop: '30px'
}

function Home(props) {
  return(
    <div className="container" style={homeStyle}>
      Hello from home {props.fav}
    </div>
  );
}

module.exports = Home;

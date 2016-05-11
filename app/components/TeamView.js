var React = require('react');


function BatsmenDetail(props){
  return(
    <div>
      {
        props.showDetails.showHomeTeamDetails
        ? <div>Batsmen</div>
        : null
      }
    </div>
  )
}

function TeamView(props){
  return(
    <span>
    { props.home
      ? <span onClick={props.handleClick}>
          {props.home}
        </span>
      : <span onClick={props.handleClick}>
          {props.away}
        </span>
    }
    </span>
  );
}

module.exports = TeamView;

var React = require('react');

var BatsmenDetailStyles = {
  batsmenList: {
    marginTop: "30px"
  }
}


function Batsmen (props){
  return(
    <div>
      {props.batsmen.name_display_first_last}
    </div>
  )
}

function BatsmenDetail (props){
  return(
    <div style={BatsmenDetailStyles.batsmenList}>
      {
        props.batsmen.batter.map(function(info){
          return <Batsmen key={info.id} batsmen={info} />
        })
      }
    </div>
  )
}

module.exports = BatsmenDetail;

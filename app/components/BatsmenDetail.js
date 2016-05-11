var React = require('react');

var BatsmenDetailStyles = {
  batsmenList: {
    marginTop: "30px"
  },
  detailItem: {
    marginLeft: "0px"
  }
}


function Batsmen (props){
  return(
    <div className= "row" style={BatsmenDetailStyles.detailItem}>
    <span className= "col-sm-2" style={BatsmenDetailStyles.detailItem}>  {props.batsmen.name_display_first_last} </span>
    <span className= "col-sm-1" style={BatsmenDetailStyles.detailItem}> {props.batsmen.a} </span>
    <span className= "col-sm-1" style={BatsmenDetailStyles.detailItem}>   {props.batsmen.h} </span>
    <span className= "col-sm-1" style={BatsmenDetailStyles.detailItem}>   {props.batsmen.rbi} </span>
    <span className= "col-sm-1" style={BatsmenDetailStyles.detailItem}>   {props.batsmen.bb}  </span>
    <span className= "col-sm-1" style={BatsmenDetailStyles.detailItem}>   {props.batsmen.so}  </span>
    <span className= "col-sm-1" style={BatsmenDetailStyles.detailItem}>   {props.batsmen.avg} </span>
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

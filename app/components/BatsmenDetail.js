var React = require('react');

var BatsmenDetailStyles = {
  batsmenList: {
    marginTop: "50px",
    fontFamily: "'Roboto', sans-serif",
    paddingBottom: "1px",
    boxShadow: "1px 1px 1px 1px #AEAEAE",
    marginBottom: "20px",
    paddingLeft: "0px",
    paddingRight: "0px"
  },
  detailItem: {
    fontFamily: "'Roboto', sans-serif",
    paddingBottom: "5px",
    paddingTop: "5px"
  },
  detailItemWrapper: {
    fontFamily: "'Roboto', sans-serif",
    paddingBottom: "1px",
    borderBottom: "1px solid #ebebeb",
    width: "100%",
    marginRight: "0px",
    marginLeft: "0px"
  }
}


function Batsmen (props){
  return(
    <div className= "row" style={BatsmenDetailStyles.detailItemWrapper}>
      <span className= "col-xs-2" style={BatsmenDetailStyles.detailItem}>  {props.batsmen.name_display_first_last} </span>
      <span className= "col-xs-1 col-xs-offset-2" style={BatsmenDetailStyles.detailItem}> {props.batsmen.a} </span>
      <span className= "col-xs-1" style={BatsmenDetailStyles.detailItem}>   {props.batsmen.h} </span>
      <span className= "col-xs-1" style={BatsmenDetailStyles.detailItem}>   {props.batsmen.rbi} </span>
      <span className= "col-xs-1" style={BatsmenDetailStyles.detailItem}>   {props.batsmen.bb}  </span>
      <span className= "col-xs-1" style={BatsmenDetailStyles.detailItem}>   {props.batsmen.so}  </span>
      <span className= "col-xs-1" style={BatsmenDetailStyles.detailItem}>   {props.batsmen.avg} </span>
    </div>
  )
}

function BatsmenDetail (props){
  return(
    <div className="col-xs-8 col-xs-offset-1" style={BatsmenDetailStyles.batsmenList}>
      <div className= "row" style={BatsmenDetailStyles.detailItemWrapper}>
        <span className= "col-xs-2" style={BatsmenDetailStyles.detailItem}> <strong> Name </strong> </span>
        <span className= "col-xs-1 col-xs-offset-2" style={BatsmenDetailStyles.detailItem}> <strong> a </strong> </span>
        <span className= "col-xs-1" style={BatsmenDetailStyles.detailItem}>  <strong> h </strong> </span>
        <span className= "col-xs-1" style={BatsmenDetailStyles.detailItem}> <strong> rbi </strong> </span>
        <span className= "col-xs-1" style={BatsmenDetailStyles.detailItem}>  <strong> bb  </strong> </span>
        <span className= "col-xs-1" style={BatsmenDetailStyles.detailItem}>  <strong> so  </strong> </span>
        <span className= "col-xs-1" style={BatsmenDetailStyles.detailItem}> <strong>  avg </strong> </span>
      </div>
        {
          props.batsmen.batter.map(function(info){
            return <Batsmen key={info.id} batsmen={info} />
          })
        }
    </div>
  )
}

module.exports = BatsmenDetail;

var axios = require('axios');
var _ = require('lodash');


var _baseURI = 'http://gd2.mlb.com/components/game/mlb/year_';
var year = '2015';
var month = '06';
var day = '28';
var end_uri = '/master_scoreboard.json';

var finished_uri = _baseURI + year + '/month_' + month + '/day_' + day + end_uri;
var box_score_base_uri = 'http://gd2.mlb.com';
var fav_team_default = "Blue Jays";

function getScore(date, fav_team){
  var day = date.date();
  var month = date.month()+1;
  var year = date.year();

  month.toString().length < 2 ? formatted_month = "0" + month.toString()
                              : formatted_month = month;


  day.toString().length < 2 ? formatted_day = "0" + day.toString()
                            : formatted_day = day;

  var finished_uri = _baseURI + year + '/month_' + formatted_month + '/day_' + formatted_day + end_uri;
  return getData(finished_uri, fav_team);
}

function getData(uri,fav_team){
  if(fav_team === ""){
    fav_team = fav_team_default;
  }
  return axios.get(uri)
    .then(function (scoreData){
      var sorted_data = sortFavTeam(scoreData,fav_team);
      return sorted_data;
    });
}



function sortFavTeam(game_data, fav_team_name){
  var team_found = _.findIndex(game_data.data.data.games.game,function(team){
    return team.home_team_name.toLowerCase() === fav_team_name.toLowerCase() || team.away_team_name.toLowerCase() === fav_team_name.toLowerCase();
  });
  if(team_found !== -1){
    game_data.data.data.games.game.splice(0,0,game_data.data.data.games.game.splice(team_found,1)[0]);
  }
  return game_data;
}

function sortFavTeam1(game_data, fav_team_name){
  var team_found = _.findIndex(game_data.data.games.game,function(team){
    return team.home_team_name.toLowerCase() === fav_team_name.toLowerCase() || team.away_team_name.toLowerCase() === fav_team_name.toLowerCase();
  });
  if(team_found !== -1){
    game_data.data.games.game.splice(0,0,game_data.data.games.game.splice(team_found,1)[0]);
  }
  return game_data;
}

function getBoxScore(game_data_directory){
  var box_score_finished_uri = box_score_base_uri + game_data_directory + '/boxscore.json';
  return axios.get(box_score_finished_uri)
    .then(function(box_score_data){
      return box_score_data.data;
    });
}

module.exports = {
  getScore : getScore,
  getBoxScore: getBoxScore,
  sortFavTeam: sortFavTeam1
};

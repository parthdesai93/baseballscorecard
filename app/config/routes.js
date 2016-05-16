var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;
var Main = require('../components/Main');
var HomeContainer = require('../containers/HomeContainer');
var GameContainer = require('../containers/GameContainer');
var DetailViewContainer = require('../containers/DetailViewContainer')

var routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={HomeContainer} />
      <Route path="/detail" component={DetailViewContainer} />
    </Route>
  </Router>
);

module.exports = routes;

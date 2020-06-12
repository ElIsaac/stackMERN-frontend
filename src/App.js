import React from 'react';
import {BrowserRouter as Router, Link, Switch,Route} from 'react-router-dom'
import Admin from './pages/Admin'
import SignIn from './pages/Admin/SignIn'
import AdminHome from './pages/Admin'
import routes from './config/routes'

import './App.scss';
import Contact from './pages/Contact';



function App() {

  return (
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <RouteWithSubRoutes key={index} {...route} />
        ))}
      </Switch>
    </Router>

  );
}




function RouteWithSubRoutes(route){
console.log(route);
return (
  <Route
  path={route.path}
  exact={route.exact}
  render={props => <route.component routes={route.routes} {...props}/>}
  
  />
);
}




export default App;

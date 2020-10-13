import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './screens/Home';
import Register from './screens/Register';
import DashBoard from './screens/DashBoard';
import Login from './screens/Login';
import './assets/fonts/css/font.css'
import './App.css';
import MyMenus from './screens/MyMenus';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/dashboard' component={DashBoard}/>
        <Route exact path='/mymenus' component={MyMenus}/>
        <Redirect to='/'/> 
      </Switch>
    </div>
  );
}

export default App;

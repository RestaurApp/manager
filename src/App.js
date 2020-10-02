import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './screens/Home';
import './App.css';
import Register from './screens/Register';
import DashBoard from './screens/DashBoard';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/dashboard' component={DashBoard}/>
        <Redirect to='/'/> 
      </Switch>
    </div>
  );
}

export default App;

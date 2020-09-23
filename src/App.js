import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './screens/Home';
import './App.css';
import Register from './screens/Register';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/register' component={Register}/>
        <Redirect to='/'/> 
      </Switch>
    </div>
  );
}

export default App;

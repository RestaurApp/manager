import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './screens/Home';
import Register from './screens/Register';
import DashBoard from './screens/DashBoard';
import Login from './screens/Login';
import MyMenus from './screens/MyMenus';
import MyCategories from './screens/MyCategories';
import './App.css';
import './assets/fonts/css/font.css'
import MyTables from './screens/MyTables';
import MyDishes from './screens/MyDishes';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/dashboard' component={DashBoard}/>
        <Route exact path='/mymenus' component={MyMenus}/>
        <Route exact path='/mycategories' component={MyCategories}/>
        <Route exact path='/mydishes' component={MyDishes}/>
        <Route exact path='/mytables' component={MyTables}/>
        
        <Redirect to='/'/> 
      </Switch>
    </div>
  );
}

export default App;

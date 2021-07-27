import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom'
import Home from './screens/Home';
import Register from './screens/Register';
import DashBoard from './screens/DashBoard';
import Login from './screens/Login';
import MyMenus from './screens/MyMenus';
import MyCategories from './screens/MyCategories';
import MyTables from './screens/MyTables';
import MyDishes from './screens/MyDishes';
import MyProfile from './screens/MyProfile';
import MyCash from './screens/MyCash';
import './App.css';
import './assets/fonts/css/font.css'
import  AuthenticatedRoute, {NotAuthenticatedRoute } from './guards/AuthenticatedRoute';

function App() {

  return (
    <div className="App">
      <Switch>
        <AuthenticatedRoute exact path='/' component={Home}/>
        <Route exact path='/register' component={Register}/>
        <NotAuthenticatedRoute exact path='/login' component={Login}/>
        <AuthenticatedRoute exact path='/dashboard' component={DashBoard}/>
        <AuthenticatedRoute exact path='/mymenus' component={MyMenus}/>
        <AuthenticatedRoute exact path='/mycategories' component={MyCategories}/>
        <AuthenticatedRoute exact path='/mydishes' component={MyDishes}/>
        <AuthenticatedRoute exact path='/mytables' component={MyTables}/>
        <AuthenticatedRoute exact path='/profile' component={MyProfile}/>
        <AuthenticatedRoute exact path='/cash' component={MyCash}/>
        
        <Redirect to='/dashboard'/> 
      </Switch>
    </div>
  );
}

export default App;

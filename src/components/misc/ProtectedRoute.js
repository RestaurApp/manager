import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from './../../contexts/AuthContext';

const ProtectedRoute = ({ ...rest }) => {
  const { currentUser } = useContext(AuthContext) 
  
  return currentUser && currentUser.restaurants.length ? <Route {...rest}/> : <Redirect to="/login"/>
}

export default ProtectedRoute
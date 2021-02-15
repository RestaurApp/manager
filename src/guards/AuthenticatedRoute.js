import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext'

const RedirectToLogin = () => <Redirect to='/login' />

const RedirectToHome = () => <Redirect to='/dashboard' />

const AuthenticatedRoute = (props) =>  {
  const { currentUser } = useAuthContext()
  return <Route {...props} component={currentUser ? props.component : RedirectToLogin} />
}

export const NotAuthenticatedRoute = (props) =>  {
  const { currentUser } = useAuthContext()
  return <Route {...props} component={!currentUser ? props.component : RedirectToHome} />
}

export default AuthenticatedRoute
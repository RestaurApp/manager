import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthContextProvider } from './contexts/AuthContext';
import firebaseApp from './services/Firebase'

ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider>
      <App/>
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

const disconnectOnAuthStateChangedObserver = firebaseApp
.auth()
.onAuthStateChanged(() => disconnectOnAuthStateChangedObserver())

serviceWorker.unregister();

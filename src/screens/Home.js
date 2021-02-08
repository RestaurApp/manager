import React, { useContext } from 'react';
import IntroHome from '../assets/img/introHome.svg'
import Button from '../components/misc/Button';
import '../assets/stylesheets/Home.css'
import '../assets/stylesheets/RegisterForm.css'
import { Redirect } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Home = () => {
  const { currentUser } = useContext(AuthContext) 

  if (currentUser) {
    return <Redirect to="/dashboard"/>
  }
  return (
    <div className="Home">
      <img className="Homeimage" src={IntroHome} alt="intro-home" />
      <div className="ButtonsContainer mt-4">
        <Button type="primary" text="Registra tu cuenta" action="/register" />
        <Button type="primary" outline text="Login con tu cuenta" action="/login"/>
      </div>
    </div>
  );
};

export default Home;
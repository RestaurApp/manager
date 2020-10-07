import React from 'react';
import IntroHome from '../assets/img/introHome.svg'
import Button from '../components/misc/Button';
import '../assets/stylesheets/Home.css'
import '../assets/stylesheets/RegisterForm.css'

const Home = () => {
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
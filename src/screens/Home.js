import React from 'react';
import IntroHome from '../assets/img/introHome.svg'
import '../assets/stylesheets/Home.css'
import Button from '../components/misc/Button';

const Home = () => {
  return (
    <div className="Home">
       <img className="Homeimage" src={IntroHome} alt="intro-home" />
       <Button type="primary" text="Registra tu cuenta" action={console.log('holi')}/>
       <Button type="primary" outline text="Login con tu cuenta" action={console.log('holi')}/>
    </div>
  );
};

export default Home;
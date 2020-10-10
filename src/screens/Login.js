import React, { useContext } from 'react';
import IntroHome from '../assets/img/introHome.svg'
import BackGroundLogin from '../assets/img/bg.jpg'
import Button from '../components/misc/Button';
import { useForm } from 'react-hook-form';
import { loginUser } from '../services/AuthService';
import AuthContext from '../contexts/AuthContext';
import '../assets/stylesheets/RegisterForm.css'
import '../assets/stylesheets/Login.css'

const Home = () => {
  const { handleSubmit, register, errors } = useForm();
  const { setAuthUser } = useContext(AuthContext) 

  const onSubmit = values => {
    loginUser(values)
      .then(result => {
        setAuthUser(result.data.userInfo)
      })
      .catch(err => console.log(err))
  };
  
  return (
    <div className="Login" style={{ background: `url(${BackGroundLogin})`}}>
      <div className="Login-wrapper">
      <img className="Homeimage" src={IntroHome} alt="intro-home" />
        <div className="RegisterForm LoginForm">
          <form onSubmit={handleSubmit(onSubmit)} className="w-100">
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="email">Email address</label>
                <input
                  placeholder="Enter email"
                  className="form-control"
                  name="email"
                  ref={register({
                    required: "Required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address"
                    }
                  })}
                />
                <p className="ErrorMessage text-danger mb-0 text-left">{errors.email && errors.email.message}</p> 
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  name="password"
                  ref={register()}
                />
                <p className="ErrorMessage text-danger mb-0 text-left">{errors.password && errors.password.message}</p>
              </div>
            </div>
            <div className="Buttons-container mt-4">
              <Button type="primary" buttonType="submit" text="Login"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
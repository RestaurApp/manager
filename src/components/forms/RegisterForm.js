import React from "react";
import { useForm } from "react-hook-form";
import '../../assets/stylesheets/RegisterForm.css'
import Logo from '../../assets/img/logo.png'

const RegisterForm = () => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => console.log(values);

  return (
    <div className="RegisterForm">
      <div className="logo-container">
        <img src={Logo}/>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
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
          <p className="text-danger text-left">{errors.email && errors.email.message}</p> 
        </div>
        <div className="form-group">
          <label htmlFor="password">password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            ref={register({
              required: "Required",
              minLength: {
                value: 5,
                message: "min length is 5"
              }
            })}
          />
           <p className="text-danger text-left">{errors.password && errors.password.message}</p>
        </div>
        <div className="Buttons-container">
          <button className="btn"type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm
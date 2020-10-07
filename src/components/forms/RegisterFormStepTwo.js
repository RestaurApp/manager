import React from "react";
import { useForm } from "react-hook-form";
import '../../assets/stylesheets/RegisterForm.css'

const RegisterForm = () => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => console.log(values);

  return (
    <div className="RegisterForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-12 mb-4">
            <h2 className="StepOneTitle">Crea tu restaurante con <span>MyMenus</span></h2>
            <p className="StepOneDescription">Regístrate para crear tu perfil privado</p>
          </div>  
          <div className="col">
            <label htmlFor="name">Restaurant name</label>
            <input
              placeholder="Nombre"
              className="form-control"
              name="name"
            />
            <p className="text-danger text-left">{errors.name && errors.name.message}</p> 
          </div>
          <div className="col">
            <label htmlFor="lastname">Address</label>
            <input
              placeholder="lastname"
              className="form-control"
              name="lastname"
            />
            <p className="text-danger text-left">{errors.name && errors.name.message}</p> 
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label htmlFor="phone">Phone</label>
            <input
              placeholder="phone"
              className="form-control"
              name="phone"
            />
            <p className="text-danger text-left">{errors.name && errors.name.message}</p> 
          </div>
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
            <p className="text-danger text-left">{errors.email && errors.email.message}</p> 
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label htmlFor="tables">Tables</label>
            <input
              placeholder="tables restaurant"
              className="form-control"
              name="tables"
            />
            <p className="text-danger text-left">{errors.email && errors.email.message}</p> 
          </div>

          <div className="col">
            <label htmlFor="food">Kind of Food</label>
            <input
              placeholder="food restaurant"
              className="form-control"
              name="food"
            />
            <p className="text-danger text-left">{errors.email && errors.email.message}</p> 
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label htmlFor="logo">Logo restaurant</label>
            <input
              type="file"
              placeholder="logo restaurant"
              className="form-control"
              name="logo-restaurante"
            />
            <p className="text-danger text-left">{errors.email && errors.email.message}</p> 
          </div>
        </div>
    
        <div className="Buttons-container">
          <button className="btn"type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm
import React from "react";
import { useForm } from "react-hook-form";
import { createRestaurant } from "../../services/RestaurantService";
import { createTables } from "../../services/TableService";
import Button from './../misc/Button'
import '../../assets/stylesheets/RegisterForm.css'

const RegisterForm = () => {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = values => {
    createRestaurant(values)
      .then(result => {
        const tableBody = {
          restaurantId: result.data.id,
          number: result.data.tablesNumber
        }
       return  createTables(tableBody)
          .then(result => console.log('TODO OK, AQUI HAY QUE REDIRIGIR'))
      })
      .catch(error =>  console.log(error))
  };

  return (
    <div className="RegisterForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-12 mb-4">
            <h2 className="StepOneTitle">Crea tu restaurante con <span>MyMenus</span></h2>
            <p className="StepOneDescription">Regístrate para crear tu perfil privado</p>
          </div>  
          <div className="col">
            <label htmlFor="name">Nombre restaurante</label>
            <input
              placeholder="Nombre"
              className="form-control"
              name="name"
              ref={register({ required: true })}
            />
            <p className="text-danger text-left">{errors.name && errors.name.message}</p> 
          </div>
          <div className="col">
            <label htmlFor="lastname">Dirección</label>
            <input
              placeholder="C/ Ejemplo 123"
              className="form-control"
              name="address"
              ref={register({ required: true })}
            />
            <p className="text-danger text-left">{errors.name && errors.name.message}</p> 
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label htmlFor="phone">Teléfono</label>
            <input
              placeholder="Teléfono"
              className="form-control"
              name="phone"
              ref={register({ required: true })}
            />
            <p className="text-danger text-left">{errors.name && errors.name.message}</p> 
          </div>
          <div className="col">
            <label htmlFor="email">Email</label>
            <input
              placeholder="Email del restaurante"
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
            <label htmlFor="tables">Número de mesas</label>
            <input
              min={0}
              placeholder="0"
              className="form-control"
              name="tablesNumber"
              type="number"
              ref={register({ required: true })}
            />
            <p className="text-danger text-left">{errors.email && errors.email.message}</p> 
          </div>

          <div className="col">
            <label htmlFor="food">Tipo de comida</label>
            <input
              placeholder="Tipo de comida"
              className="form-control"
              name="foodType"
              ref={register({ required: false })}
            />
            <p className="text-danger text-left">{errors.email && errors.email.message}</p> 
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label htmlFor="logo">Logo del restaurante</label>
            <input
              type="file"
              placeholder="logo restaurant"
              className="form-control"
              name="logo-restaurante"
            />
          </div>
        </div>
    
        <div className="Buttons-container">
          <Button buttonType="submit" stype="primary">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm
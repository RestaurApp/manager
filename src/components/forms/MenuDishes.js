import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../misc/Button";
import AnimatedMulti from "./MultiSelect";

const RegisterDishesForm = ({ category }) => {
  const { handleSubmit, register, errors } = useForm();
  const [allergens, setAllergens] = useState([])

  const onSubmit = values => {
    const dataAllergens = allergens.reduce((acc, allergen) => {
      return [...acc, allergen.value]
    }, [])
    const data = { ...values, allergens: dataAllergens, category: category.id }
    console.log(data)
  };
  
  return (
    <div className="RegisterDishesForm">
      <form onSubmit={handleSubmit(onSubmit)} className="w-100">
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Nombre"
              className="form-control"
              name="name"
              ref={register({ required: true })}
            />
           {errors.name && <p className="ErrorMessage text-danger mb-0 text-left">Requiered fill</p> }
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label htmlFor="price">Precio del Plato</label>
            <input
              step=".01"
              type="number"
              placeholder="Precio en €"
              className="form-control"
              name="price"
              ref={register({ required: false })}
            />
            {errors.phone && <p className="ErrorMessage text-danger mb-0 text-left">requiered filed</p>}
          </div>
          <div className="col-12 mt-3">
            <label htmlFor="price">Description del Plato</label>
            <input
              type="text"
              placeholder="Nombre"
              className="form-control"
              name="description"
              ref={register({ required: true })}
            />
            {errors.name && <p className="ErrorMessage text-danger mb-0 text-left">Requiered fill</p> }
            <p className="ErrorMessage text-danger mb-0 text-left">{errors.email && errors.email.message}</p> 
          </div>
          <div className="col-12 mt-3">
            <div className="d-flex flex-column">
              <label htmlFor="lastName">Alergenos del plato</label>
              <AnimatedMulti
                name="Second"
                onChangeFn={setAllergens}
              />
            </div>
          </div>
        </div>
      
        <div className="Buttons-container">
          <Button type="primary" buttonType="submit" text="Submit"/>
        </div>
      </form>
    </div>
  );
};

export default RegisterDishesForm
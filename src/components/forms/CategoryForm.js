import React from 'react';
import { useForm } from "react-hook-form";
import Button from '../misc/Button';

const CategoryForm = () => {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = (values) => {
    console.log(values)
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-100">
        <div className="col">
          <label htmlFor="name">Nombre de la categoría</label>
          <input
            type="text"
            placeholder="Nombre"
            className="form-control"
            name="name"
            ref={register({ required: true })}
          />
          {errors.name && <p className="ErrorMessage text-danger mb-0 text-left">Requiered fill</p> }
        </div>
        <div className="d-flex justify-content-center mt-3 mb-0">
          <Button buttonType="submit" text="Crear" type="primary" />
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../misc/Button';
import { createCategory } from '../../services/CategoryService';

const CategoryForm = ({ callBack }) => {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async (values) => {
    try {
      const uploads = new FormData();
      uploads.append('name', values.name);
      uploads.append('description', values.description);
      uploads.append('picture', values.file[0]);

      const result = await createCategory(uploads);
      callBack(result);
    } catch (error) {
      console.log(error);
    }
  };

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
          {errors.name && <p className="ErrorMessage text-danger mb-0 text-left">Este campo es requerido</p>}
        </div>
        <div className="col mt-3">
          <label htmlFor="name">Descripción de la categoría</label>
          <input
            type="text"
            placeholder="Descripción"
            className="form-control"
            name="description"
            ref={register({ required: false })}
          />
        </div>
        <div className="col mt-3">
          <label htmlFor="name">Imagen de la categoría</label>
          <input
            type="file"
            placeholder="Imagen del plato"
            className="form-control"
            name="file"
            ref={register({ required: false })}
          />
        </div>
        <div className="d-flex justify-content-center mt-3 mb-0">
          <Button buttonType="submit" text="Crear" type="primary" />
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;

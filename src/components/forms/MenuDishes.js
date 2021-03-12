import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../misc/Button';
import AnimatedMulti from './MultiSelect';
import { ALLERGENS } from '../../constants/constants';
import { postProduct, updateProduct } from '../../services/ProductService';
import Spinner from '../misc/SpinnerModal';
import seeMenusImg from './../../assets/img/food_list.svg';

const RegisterDishesForm = ({ onSubmitCb, closeModal }) => {
  const { handleSubmit, register, errors } = useForm();
  const [allergens, setAllergens] = useState([]);
  const [isLoading, setIsloading] = useState();
  const [showOptions, setShowOptions] = useState(false);

  const onSubmit = async (values) => {
    setIsloading(true);
    try {
      const dataAllergens = allergens.reduce((acc, allergen) => {
        return [...acc, allergen.value];
      }, []);

      const data = {
        ...values,
        allergens: dataAllergens,
        type: 'esto hay que borrarlo',
      };

      const result = await postProduct(data);
      if (values.file[0]) {
        const uploads = new FormData();
        uploads.append('picture', values.file[0]);
        await updateProduct(uploads, result.data.id);
      }
      setIsloading(false);
      setShowOptions(result.data);
    } catch (error) {
      console.log(error);
      setIsloading(false);
    }
  };
  if (isLoading) {
    return (
      <div className="d-flex align-items-center justify-content-center mt-4 pt-4">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="RegisterDishesForm">
      {showOptions ? (
        <div className="Card" style={{border: 'none', boxShadow: "none"}}>
          <img src={seeMenusImg} alt="img" />
          <h3>Configura tu plato</h3>
          <p>
            Ahora añade las opciones del plato, si tu plato no tiene opciones puedes cerrar ya y tu
            plato estará configurado.
          </p>
          <div className="Buttons-container">
            <Button type="primary" action={() => onSubmitCb(showOptions)} text="AÑADIR" />
            <Button type="primary" buttonType="submit" text="CERRAR" action={closeModal} />
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="w-100">
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="name">Nombre del plato</label>
              <input
                type="text"
                placeholder="Nombre"
                className="form-control"
                name="name"
                ref={register({ required: true })}
              />
              {errors.name && (
                <p className="ErrorMessage text-danger mb-0 text-left">El nombre es requerido</p>
              )}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label htmlFor="price">Precio del plato</label>
              <input
                step=".01"
                type="number"
                placeholder="Precio en €"
                className="form-control"
                name="price"
                ref={register({ required: true })}
              />
              {errors.price && (
                <p className="ErrorMessage text-danger mb-0 text-left">El precio es requerido</p>
              )}
            </div>
            <div className="col-12 mt-3">
              <label htmlFor="price">Descripción del plato</label>
              <input
                type="text"
                placeholder="Descripción"
                className="form-control"
                name="description"
                ref={register({ required: true })}
              />
              {errors.description && (
                <p className="ErrorMessage text-danger mb-0 text-left">
                  La descripción es requerida
                </p>
              )}
            </div>
            <div className="col-12 mt-3">
              <label htmlFor="price">Imagen del plato</label>
              <input
                type="file"
                placeholder="Imagen del plato"
                className="form-control"
                name="file"
                ref={register({ required: false })}
              />
            </div>

            <div className="col-12 mt-3">
              <div className="d-flex flex-column">
                <label htmlFor="lastName">Alergenos del plato</label>
                <AnimatedMulti options={ALLERGENS} name="Second" onChangeFn={setAllergens} />
              </div>
            </div>
          </div>

          <div className="Buttons-container">
            <Button type="primary" buttonType="submit" text="Siguiente paso" />
          </div>
        </form>
      )}
    </div>
  );
};

export default RegisterDishesForm;

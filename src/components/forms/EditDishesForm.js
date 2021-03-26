import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../misc/Button';
import AnimatedMulti from './MultiSelect';
import DishRow from '../misc/DishRow';
import { ALLERGENS } from '../../constants/constants';
import { updateProduct } from '../../services/ProductService';
import { deleteOption } from '../../services/OptionService';
import EditOptionsForm from './EditDishesOptions';

const EditDishesForm = ({ onSubmitCb, dish }) => {
  const defaultAllergens = dish.allergens.map((allergen) => {
    return { value: allergen, label: allergen };
  });

  const defaultValues = {
    name: dish.name,
    price: dish.price,
    description: dish.description,
  };

  const { handleSubmit, register, errors } = useForm({
    defaultValues: defaultValues,
  });

  const [allergens, setAllergens] = useState(defaultAllergens);
  const [showOption, setShowOption] = useState();
  const [modalOptions, setModalOptions] = useState();

  const onSubmit = async (values) => {
    try {
      const dataAllergens = allergens.reduce((acc, allergen) => {
        return [...acc, allergen.value];
      }, []);

      const data = {
        ...values,
        allergens: dataAllergens,
        type: 'esto hay que borrarlo',
      };

      const result = await updateProduct(data, dish.id);
      if (values.file[0]) {
        const uploads = new FormData();
        uploads.append('picture', values.file[0]);
        await updateProduct(uploads, dish.id);
      }

      onSubmitCb(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeOption = async (id) => {
    try {
      await deleteOption(id);
    } catch (error) {
      console.log(error);
    } finally {
      setModalOptions(false);
    }
  };

  const ModalOptions = () => (
    <div className="col-12 mt-3">
      <label htmlFor="lastName">Opciones del plato</label>
      {dish.options.length ? (
        dish.options.map((option, i) => {
          return (
            <DishRow
              key={i}
              dish={option}
              onDelete={removeOption}
              option
              optionAction={() => {
                setModalOptions(false);
                setShowOption({ ...option, update: true });
              }}
            />
          );
        })
      ) : (
        <div className="row m-0 justify-content-between">
          <p className="m-0 text-center mt-2 p-2">"Este plato no tiene extras"</p>
          <div
            className="DishRowButton bg-light-green mr-2 mt-2"
            onClick={() => {
              setModalOptions(false);
              setShowOption({ update: false, dishId: dish.id, options: [] });
            }}
          >
            <i className="icon-pencil" />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="RegisterDishesForm">
      {modalOptions ? (
        <ModalOptions />
      ) : showOption ? (
        <EditOptionsForm
          id={showOption.id}
          closeModal={() => setShowOption(false)}
          update={showOption}
        />
      ) : (
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
              {errors.name && (
                <p className="ErrorMessage text-danger mb-0 text-left">El nombre es requerido</p>
              )}
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
              {errors.description && (
                <p className="ErrorMessage text-danger mb-0 text-left">
                  La descripción es requerida
                </p>
              )}
            </div>
            <div className="col-12 mt-3">
              <label htmlFor="price">Imagen del Plato</label>
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
                <AnimatedMulti
                  options={ALLERGENS}
                  defaultValue={defaultAllergens}
                  name="Second"
                  onChangeFn={setAllergens}
                />
              </div>
            </div>
          </div>

          <div className="Buttons-container">
            <Button type="primary" buttonType="submit" text="Guardar" />
            <Button
              type="secondary"
              buttonType="submit"
              text="Ver opciones"
              action={() => setModalOptions(true)}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditDishesForm;

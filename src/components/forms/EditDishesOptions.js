import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../misc/Button';
import { postOptions, updateOption } from '../../services/OptionService';
import RadioButton from '../misc/RadioButton';

const EditOptionsForm = ({ id, closeModal, update }) => {
  const { handleSubmit, register, errors, reset } = useForm({
    defaultValues: { name: update.name, description: update.description },
  });
  const [rowOptions, setRowOptions] = useState([]);
  const [state, setState] = useState({
    required: update.required,
    multiple: update.multiple,
  });
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const countOptions = useRef(0);

  const [listOptions, setListOptions] = useState(update.options || [])

  const onSubmit = async (values) => {
    try {
      const data = {
        name: values.name,
        description: values.description,
        ...state,
        options: [
          ...listOptions,
          ...rowOptions.map((el, index) => {
            return {
              name: values[`option${index + 1}`],
              price: values[`optionPrice${index + 1}`],
            };
          }),
        ],
      };
      update.update ? await updateOption(id, data) : await postOptions(update.dishId, data);
    } catch (error) {
      console.log(error);
    } finally {
      if (showMoreOptions) {
        setRowOptions([]);
        setState({ required: false, multiple: false });
        reset({ ...state });
      } else {
        closeModal();
      }
    }
  };

  const moreOptions = (index) => {
    const newRow = (
      <div className="row mx-0 mt-3" key={index}>
        <div className="col-8 ">
          <input
            type="text"
            placeholder="Nombre"
            className="form-control"
            name={`option${index}`}
            ref={register({ required: true })}
          />
        </div>
        {errors[`option${index}`] && (
          <p className="ErrorMessage text-danger mb-0 text-left">Requiered fill</p>
        )}
        <div className="col-3 ">
          <input
            type="number"
            placeholder="Precio"
            className="form-control"
            name={`optionPrice${index}`}
            ref={register({ required: false })}
          />
        </div>
      </div>
    );
    countOptions.current = index;
    setRowOptions([...rowOptions, newRow]);
  };

  return (
    <div className="RegisterDishesForm">
      <form onSubmit={handleSubmit(onSubmit)} className="w-100">
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="name">Nombre de la opción</label>
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

          <div className="col-12 mt-3">
            <label htmlFor="price">Descripción de la opción</label>
            <input
              type="text"
              placeholder="Descripción"
              className="form-control"
              name="description"
              ref={register({ required: false })}
            />
          </div>
          <div className="col-12 mt-3 d-flex flex-column">
            <label htmlFor="price">¿Es obligatorio elegir una opción?</label>
            <div className="col-12 mb-2">
              <RadioButton
                state={state.required}
                action={() => setState({ ...state, required: true })}
                label="Si"
              />
              <RadioButton
                state={!state.required}
                action={() => setState({ ...state, required: false })}
                label="No"
              />
            </div>
          </div>
          <div className="col-12 mt-3 ">
            <label htmlFor="price">¿Se pueden elegir varias opciones?</label>
            <div className="col-12 mb-2">
              <RadioButton
                state={state.multiple}
                action={() => setState({ ...state, multiple: true })}
                label="Si"
              />
              <RadioButton
                state={!state.multiple}
                action={() => setState({ ...state, multiple: false })}
                label="No"
              />
            </div>
          </div>

          <div className="col-12 d-flex justify-content-between mt-3 ">
            <label htmlFor="price" className="">
              Ahora añade las opciones...
            </label>

            <div
              className="DishRowButton bg-light-green "
              onClick={() => {
                moreOptions(countOptions.current + 1);
              }}
            >
              <i className="icon-pencil" />
            </div>
          </div>
          {listOptions?.map((item, index) => (
            <div className="row mx-0 mt-3 align-items-center" key={item._id}>
              <div className="col-7 ">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="form-control"
                  name={`option${index}`}
                  defaultValue={item.name}
                  ref={register({ required: true })}
                />
              </div>
              {errors[`option${index}`] && (
                <p className="ErrorMessage text-danger mb-0 text-left">Requiered fill</p>
              )}
              <div className="col-3 ">
                <input
                  type="number"
                  placeholder="Precio"
                  className="form-control"
                  name={`optionPrice${index}`}
                  defaultValue={item.price}
                  ref={register({ required: false })}
                />
              </div>
              <div className="col-1" onClick={() => setListOptions(prev => prev.filter(el => el._id !== item._id))}>
                <i className="icon-cancel" />
              </div>
            </div>
          ))}
          {rowOptions}
        </div>

        <div className="Buttons-container">
          <Button
            type="primary"
            buttonType="submit"
            text="Actualizar"
            action={() => setShowMoreOptions(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditOptionsForm;

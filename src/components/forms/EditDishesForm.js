import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../misc/Button";
import AnimatedMulti from "./MultiSelect";
import { ALLERGENS } from "../../constants/constants";
import { updateProduct } from "../../services/ProductService";

const EditDishesForm = ({ onSubmitCb, dish }) => {

  const defaultAllergens = dish.allergens.map(allergen => { return { value: allergen, label: allergen }})

  const defaultValues = {
    name: dish.name,
    price: dish.price,
    description: dish.description
  }

  const { handleSubmit, register, errors } = useForm({
    defaultValues: defaultValues
  });

  const [allergens, setAllergens] = useState(defaultAllergens)

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
            <label htmlFor="price">Imagen del Plato</label>
            <input
              type="file"
              placeholder="Imagen del plato"
              className="form-control"
              name="file"
              ref={register({ required: false })}
            />
            {errors.name && (
              <p className="ErrorMessage text-danger mb-0 text-left">Requiered fill</p>
            )}
            <p className="ErrorMessage text-danger mb-0 text-left">
              {errors.email && errors.email.message}
            </p>
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
          <Button type="primary" buttonType="submit" text="Submit"/>
        </div>
      </form>
    </div>
  );
};

export default EditDishesForm
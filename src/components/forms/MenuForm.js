import React, { useState } from "react";
import { useForm } from "react-hook-form";
import '../../assets/stylesheets/MenuForm.css'
import AnimatedMulti from "./MultiSelect";
import Button from "../misc/Button";

const MenuForm = () => {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = data => console.log(data, firstDish);
  const [firstDish, setFirstDish] = useState([])
  const [secondtDish, setSecondDish] = useState([])
  const [dessert, setDessert] = useState([])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row mb-3">
          <div className="col">
            <label htmlFor="name">Nombre del menú</label>
            <input
              type="text"
              placeholder="Nombre del menu"
              className="form-control"
              name="name"
              ref={register({ required: true })}
            />
           {errors.name && <p className="ErrorMessage text-danger mb-0 text-left">Requiered fill</p> }
          </div>
          <div className="col">
            <div className="d-flex flex-column">
              <label htmlFor="lastName">Día de la semana</label>
              <select
                id="days-input"
                className="select-input form-control"
                ref={register} 
                name="days"
              >
                <option value="Monday">Lunes</option>
                <option value="Tuesday">Martes</option>
                <option value="Wednesday">Miércoles</option>
                <option value="Thursday">Jueves</option>
                <option value="Friday">Viernes</option>
                <option value="Saturday">Sábado</option>
                <option value="Sunday">Domingo</option>
              </select>
            </div>
            {errors.lastName && <p className="ErrorMessage text-danger mb-0 text-left">requiered filed</p> }
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <label htmlFor="price">Precio del Menú</label>
            <input
              type="number"
              placeholder="Precio en €"
              className="form-control"
              name="price"
              ref={register({ required: false })}
            />
          </div>
        </div>
        <div>
          <h4 className="mb-3">Elige los platos del menú</h4>
          <div className="row mb-3">
          <div className="col-12 mb-3">
            <label htmlFor="price">First</label>
            <AnimatedMulti
              name="First"
              onChangeFn={setFirstDish}
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="price">Segundo</label>
            <AnimatedMulti
              name="Second"
              onChangeFn={setSecondDish}
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="price">Postre</label>
            <AnimatedMulti
              name="Second"
              onChangeFn={setDessert}
            />
          </div>
        </div>
        </div>
        <Button buttonType="submit" text="Crear" type="primary" />
    </form>
  );
}

export default MenuForm
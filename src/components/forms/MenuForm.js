import React from "react";
import { useForm } from "react-hook-form";
import '../../assets/stylesheets/MenuForm.css'

const MenuForm = () => {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

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
              ref={register({ required: true })}
            />
          </div>
        </div>
        <div>
          <h4 className="mb-3">Elige los platos del menú</h4>
          <div className="row mb-3">
          <div className="col-12 mb-3">
            <label htmlFor="price">Primero</label>
            <input
              type="text"
              placeholder="Primer Plato"
              className="form-control"
              name="first"
              ref={register({ required: true })}
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="price">Primero</label>
            <input
              type="text"
              placeholder="Primer Plato"
              className="form-control"
              name="second"
              ref={register({ required: true })}
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="price">Postre</label>
            <input
              type="text"
              placeholder="Postre"
              className="form-control"
              name="dessert"
              ref={register({ required: true })}
            />
          </div>
        </div>
        </div>
      
      <input type="submit" />
    </form>
  );
}

export default MenuForm
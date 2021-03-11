import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import '../../assets/stylesheets/MenuForm.css'
import AnimatedMulti from "./MultiSelect";
import Button from "../misc/Button";
import { getProducts } from "../../services/ProductService";
import useFetchWithLoading from "../../hooks/useFetchWithLoading";
import Spinner from "../misc/Spinner";
import { WEEK_DAYS, WEEK_SPANISH_DAYS } from "../../constants/constants";
import { createMenu } from "../../services/MenuService";

const MenuForm = ({ onPost }) => {
  const { register, errors, handleSubmit } = useForm();
  const [dishes, setDishes] = useState([])
  const [firstDish, setFirstDish] = useState([])
  const [secondDish, setSecondDish] = useState([])
  const [dessert, setDessert] = useState([])

  const onSubmit = data => {
    const formattedData = {
      ...data,  
      first: firstDish.map(e => e.value), 
      second: secondDish.map(e => e.value),
      dessert:  dessert.map(e => e.value)
    }
    console.log(formattedData)
    createMenu(formattedData)
      .then(result => {
        onPost(result.data)
      })
      .catch(e => console.log(e))
  };

  const fetchDishes = useCallback(async () => {
    const [products] = await Promise.all([
      getProducts()
    ])
      .then(values => values)
      setDishes(products.data.map(e => { 
      return { value: e.id, label: e.name }
    }))

    return { products }
  }, [])
  
  const [loading, data] = useFetchWithLoading(fetchDishes)

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center mt-4 pt-4">
        <Spinner />
      </div>)
  }

  return (
    <form id="MenuForm" onSubmit={handleSubmit(onSubmit)}>
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
           {errors.name && <p className="ErrorMessage text-danger mb-0 text-left">El nombre es requerido</p> }
          </div>
          <div className="col">
            <div className="d-flex flex-column">
              <label htmlFor="lastName">Día de la semana</label>
              <select
                id="days-input"
                className="select-input form-control"
                ref={register} 
                name="day"
              >
                { WEEK_DAYS.map((day, i) => <option key={i} value={day}>{WEEK_SPANISH_DAYS[i]}</option>) }
              </select>
            </div>
         
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <label htmlFor="price">Precio del Menú</label>
            <input
              step=".01"
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
              needFormat
              options={dishes}
              name="First"
              onChangeFn={setFirstDish}
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="price">Segundo</label>
            <AnimatedMulti
              needFormat
              options={dishes}
              name="Second"
              onChangeFn={setSecondDish}
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="price">Postre</label>
            <AnimatedMulti
              needFormat
              options={dishes}
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
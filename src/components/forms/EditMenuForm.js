import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import AnimatedMulti from "./MultiSelect";
import Button from "../misc/Button";
import { getProducts } from "../../services/ProductService";
import useFetchWithLoading from "../../hooks/useFetchWithLoading";
import Spinner from "../misc/Spinner";
import { WEEK_DAYS, WEEK_SPANISH_DAYS } from "../../constants/constants";
import { updateMenu, deleteMenu } from "../../services/MenuService";
import '../../assets/stylesheets/MenuForm.css'
import '../../assets/stylesheets/Button.css'

const EditMenuForm = ({ onPost, onDelete, menu }) => {
  const [dishes, setDishes] = useState([])
  const formatMultipleChoice = (arr) => {
    return arr.map(e => { return { value: e.id, label: e.name }})
  }
  
  const defaultFirst = formatMultipleChoice(menu.first)
  const defaultSecond = formatMultipleChoice(menu.second)
  const defaultDessert = formatMultipleChoice(menu.desserts)

  const [firstDish, setFirstDish] = useState(formatMultipleChoice(menu.first))
  const [secondDish, setSecondDish] = useState(formatMultipleChoice(menu.second))
  const [dessert, setDessert] = useState(formatMultipleChoice(menu.desserts))

  const defaultValues = {
    name: menu.name,
    price: menu.price,
    day: menu.day,
  }

  const { handleSubmit, register, errors } = useForm({
    defaultValues: defaultValues
  });

  const onDeleteMenu = () => {
    deleteMenu(menu.id)
      .then(result => {
        onDelete(menu)
      })
      .catch(e => console.log(e))
  }

  const onSubmit = data => {

    const formattedData = {
      ...data,  
      first: firstDish.map(e => e.value), 
      second: secondDish.map(e => e.value),
      dessert:  dessert.map(e => e.value)
    }

    updateMenu(menu.id, formattedData)
      .then(result => {
        console.log('resultado de actualizar', result)
        onPost(result.data)
      })
      .catch(e => console.log(e))
  };

  const fetchDishes = useCallback(async () => {
    const [products] = await Promise.all([
      getProducts()
    ])
      .then(values => values)
      .catch(e =>  console.log(e))
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
    <div>
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
            {errors.name && <p className="ErrorMessage text-danger mb-0 text-left">Requiered fill</p> }
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
              {errors.lastName && <p className="ErrorMessage text-danger mb-0 text-left">requiered filed</p> }
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
                defaultValue={defaultFirst}
                needFormat
                options={dishes}
                name="First"
                onChangeFn={setFirstDish}
              />
            </div>
            <div className="col-12 mb-3">
              <label htmlFor="price">Segundo</label>
              <AnimatedMulti
                defaultValue={defaultSecond}
                needFormat
                options={dishes}
                name="Second"
                onChangeFn={setSecondDish}
              />
            </div>
            <div className="col-12 mb-3">
              <label htmlFor="price">Postre</label>
              <AnimatedMulti
                defaultValue={defaultDessert}
                needFormat
                options={dishes}
                name="Second"
                onChangeFn={setDessert}
              />
            </div>
          </div>
          </div>
          <div className="d-flex align-items-center">
            <Button buttonType="submit" text="Actualizar" type="primary" />
            <div id="button-delete-menu" className="Button Button-primary outline ml-2" onClick={() => onDeleteMenu()}>Borrar menú</div>
          </div>
      </form>
    </div>
  
  );
}

export default EditMenuForm
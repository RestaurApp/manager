import React, { useState } from 'react';
import Button from './Button'
import '../../assets/stylesheets/DishRow.css'

const DefaultRow = ({ title, setShowModal, addRow, addDishAction, dishId }) => {
  return (
    <div className="TableRow row">
    <div className="ImgTableRow col-2">
      <i className="icon-dish"></i>
    </div>
    <div className="BodyTableRow col-7">{title}</div>
      {!addRow 
        ? 
        <div className="ActionTableRow col-3 d-flex align-items-center ">
          <div className="DishRowButton bg-light-green  mr-1" onClick={() => {}}>
            <i className="icon-pencil"/>
          </div>
          <div className="DishRowButton bg-cancel" onClick={() => setShowModal(true)}>
            <i className="icon-cancel"/>
          </div>
        </div>
        :
        <div className="ActionTableRow col-3 d-flex justify-content-end ">
          <div className="DishRowButton bg-orange mr-1" onClick={() => addDishAction(dishId)}>
            <i className="icon-list-add"/>
          </div>
        </div>
      }
    </div>
  )
}

const CancelRow = ({ dish, onDelete, callBackFn }) => {
  return (
    <div className="CancelRow">
      <p className="m-0">¿Estas seguro de eliminar el plato <span className="font-weight-bold">{dish.name}</span>?</p>
      <Button
        small
        text="Eliminar" 
        type="primary"
        action={() => onDelete(dish.id, callBackFn)}
      />
    </div>
  )
}

const DishRow = ({ dish, onDelete, addDishAction, addRow, selected }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  console.log(selected)
  return (
    <div className={`DishRow ${selected ? 'row-selected' : ''}`}>
      {selected && <div className="selected-div-row">Seleccionado</div>}
      <DefaultRow addRow={addRow} dishId={dish.id} title={dish.name} addDishAction={addDishAction} setShowModal={setShowDeleteModal} />
      {showDeleteModal && <CancelRow callBackFn={setShowDeleteModal} dish={dish} onDelete={onDelete}/>}
    </div>
  );
};

export default DishRow;
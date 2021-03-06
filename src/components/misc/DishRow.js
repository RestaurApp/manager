import React, { useState } from 'react';
import Button from './Button'
import '../../assets/stylesheets/DishRow.css'

const DefaultRow = ({ selected, title, setShowModal, addRow, addDishAction, dishId, option, optionAction }) => {
  return (
    <div className="TableRow row">
    <div className="ImgTableRow col-2">
      <i className="icon-dish"></i>
    </div>
    <div className="BodyTableRow col-7">{title}</div>
      {!addRow 
        ? 
        <div className="ActionTableRow col-3 d-flex justify-content-end ">
          {option &&  <div className="DishRowButton bg-light-green mr-2" onClick={() => optionAction(true)}>
            <i className="icon-pencil"/>
          </div>}
          <div className="DishRowButton bg-cancel" onClick={() => setShowModal(true)}>
            <i className="icon-cancel"/>
          </div>
        </div>
        :
        <div className="ActionTableRow col-3 d-flex justify-content-end ">
          <div className="DishRowButton bg-orange mr-1" onClick={() => {
              if (!selected) {
                addDishAction(dishId)
              }
              return
            }}>
            <i className="icon-list-add"/>
          </div>
        </div>
      }
    </div>
  )
}

const CancelRow = ({ dish, onDelete, callBackFn, option }) => {
  return (
    <div className="CancelRow">
      <p className="m-0">¿Estas seguro de eliminar {option ? "la opción ": "el plato "}<span className="font-weight-bold">{dish.name}</span>?</p>
      <Button
        small
        text="Eliminar" 
        type="primary"
        action={() => onDelete(dish.id, callBackFn)}
      />
    </div>
  )
}

const DishRow = ({ dish, onDelete, addDishAction, addRow, selected, defaultDeleted=false, option, optionAction }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(defaultDeleted)
  return (
    <div className={`DishRow ${selected ? 'row-selected' : ''}`}>
      {selected && <div className="selected-div-row">Seleccionado</div>}
      <DefaultRow addRow={addRow} selected={selected} dishId={dish.id} title={dish.name} addDishAction={addDishAction} setShowModal={setShowDeleteModal} option={option} optionAction={optionAction} />
      {showDeleteModal && !selected && <CancelRow callBackFn={setShowDeleteModal} dish={dish} onDelete={onDelete} option={option} />}
    </div>
  );
};

export default DishRow;
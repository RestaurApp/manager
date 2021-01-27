import React, { useState } from 'react';
import '../../assets/stylesheets/DishRow.css'
import Button from './Button'
const DefaultRow = ({ title, onDelete }) => {
  return (
    <div className="TableRow row">
    <div className="ImgTableRow col-2">
      <i className="icon-dish"></i>
    </div>
    <div className="BodyTableRow col-7">{title}</div>
    <div className="ActionTableRow col-3 d-flex align-items-center ">
      <div className="DishRowButton bg-light-green  mr-1" onClick={() => {}}>
        <i className="icon-pencil"/>
      </div>
      <div className="DishRowButton bg-cancel" onClick={() => onDelete(true)}>
        <i className="icon-cancel"/>
      </div>
    </div>
  </div>
  )
}

const CancelRow = ({ title }) => {
  return (
    <div className="CancelRow">
      <p className="m-0">¿Estas seguro de eliminar el plato <span className="font-weight-bold">{title}</span>?</p>
      <Button
        small
        text="Eliminar" 
        type="primary"
      />
    </div>
  )
}

const DishRow = ({title}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  return (
    <div className="DishRow">
      <DefaultRow title={title} onDelete={setShowDeleteModal}/>
      {showDeleteModal && <CancelRow title={title} />}
    </div>
  );
};

export default DishRow;
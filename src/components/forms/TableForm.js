import React from 'react';
import { useForm } from "react-hook-form";
import Button from '../misc/Button';
import { updateTable, deleteTable } from '../../services/TableService';

const TableForm = ({ callBack, table, onDelete }) => {
  const STATE_VALUES=["Libre", "Reservada"]

  const defaultValues = {
    name: table.name,
    state: table.state,
    diners: table.diners
  }

  const { handleSubmit, register, errors } = useForm({
    defaultValues: defaultValues
  });

  const onSubmit = (values) => {
    updateTable(values, table.id)
      .then(result => {
        callBack(result.data)
      })
      .catch(e => console.log(e))
  }

  const onDeleteTable = () => {
    deleteTable(table.id)
      .then(result => {
        onDelete(table)
      })
      .catch(e => console.log(e))
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-100">
        <div className="col">
          <label htmlFor="name">Nombre de la mesa</label>
            <input
              type="text"
              placeholder="Nombre"
              className="form-control"
              name="name"
              ref={register({ required: true })}
            />
             {errors.name && <p className="ErrorMessage text-danger mb-0 text-left">Requiered fill</p> }
          </div> 
          <div className="col mt-3">
            <label htmlFor="name">Estado de la mesa</label>
            <select
              defaultValue={table.state}
              type="text"
              placeholder="Estado"
              className="form-control"
              name="state"
              ref={register({ required: false })}
            >
              {STATE_VALUES.map((e, i) => {
                return (
                  <option key={i} value={e}>{e}</option>
                )
              })}
              
            </select>
          </div>
          <div className="col mt-3">
          <label htmlFor="name">Comensales de la mesa</label>
            <input
              min={0}
              type="number"
              className="form-control"
              name="diners"
              ref={register({ required: true })}
            />
             {errors.name && <p className="ErrorMessage text-danger mb-0 text-left">Requiered fill</p> }
          </div> 
        <div className="d-flex align-items-center mt-3 mb-0">
          <Button buttonType="submit" text="Guardar" type="primary" />
          <div id="button-delete-menu" className="Button Button-primary outline ml-2" onClick={() => onDeleteTable()}>Borrar menú</div>
        </div>

      </form>
    </div>
  );
};

export default TableForm;
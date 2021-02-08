import React, { useContext, useState, useCallback } from 'react';
import SideBar from '../components/misc/SideBar';
import WhiteBox from '../components/misc/WhiteBox';
import TableFreeImage from '../assets/img/table-free.svg'
import TableOcuppiedImage from '../assets/img/table-occupied.svg'
import { getTables, addTable, updateTable } from '../services/TableService';
import useFetchWithLoading from '../hooks/useFetchWithLoading';
import Button from './../components/misc/Button';
import '../assets/stylesheets/MyTables.css'
import SpinnerModal from '../components/misc/SpinnerModal';
import Modal from './../components/misc/Modal';
import TableForm from '../components/forms/TableForm';


const MyTables = () => {
  const [tables, setTables] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [currentTable, setCurrentTable] = useState('')

  const fetchTables = useCallback(async () => {
    const [tablesResult] = await Promise.all([
      getTables()
    ])
      .then(values => {
        setTables(values[0].data)
        return values
      })
      .catch(e => console.log(e))

    return { tablesResult }
  }, [])

  const updateQuickStatus = (id, state) => {
    console.log(id, state)
    const bodyState = {
      state: state === "Libre" ? 'Reservada' : "Libre"
    }
    updateTable(bodyState, id)
      .then(result => {
        console.log(result)
        setTables(tables.map(table => table.id === result.data.id ? { ...table, state: result.data.state } : table))
      })
  }

  const createTable = () => {
    console.log(tables.length)
    addTable({ number: tables.length + 3 })
      .then(result => {
        setTables([...tables, result.data])
      })
      .catch(e => console.log(e))
  }

  const [loading, data] = useFetchWithLoading(fetchTables)

  if (loading) {
    return <SpinnerModal />
  }

  return (
    <div className="MyTables">
      <SideBar activeTab={5} />
      <div className="content p-4 p-md-5 pt-5">
        <WhiteBox extraClassNames="mt-4">
          <h2 className="mt-2 mb-4 c-dark-gray">Tus mesas</h2>
          <p className="pb-3">
            It's simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
          <Button buttonType="submit" type="primary" text="Crear mesa" action={createTable}></Button>
          <div className="row mt-5">
            {data && tables.map((table, i) => {
              return (
                <div className="col-md-6 col-lg-4 mb-4" key={i}>
                  <div className="card TableCard">
                    <img
                      className="card-img-top"
                      src={table.state === 'Libre' ? TableFreeImage : TableOcuppiedImage}
                      alt="Card caption"
                    />
                    <div className="card-body">
                      <h5>{table.name}</h5>
                      <div>
                        <p className="table-card-quote m-0">
                          Estado:
                        <span
                            className={`state-message-${table.state === 'Libre' ? 'free' : 'occupied'}`}
                          >
                            {table.state}
                          </span>
                        </p>
                        <p className="table-card-quote m-0">
                          Comensales:
                        <span className="diners-message">{table.diners}</span>
                        </p>
                      </div>
                    </div>
                    <div className="px-2 mb-3 d-flex align-items-center justify-content-around">
                      <button onClick={() => {
                          setShowForm(true)
                          setCurrentTable(table)
                        }}>
                        Editar
                      </button>
                      <button 
                        onClick={() => updateQuickStatus(table.id, table.state)}>
                          {table.state === 'Libre' ? 'Reservar' : 'Liberar'}
                      </button>
                    </div>

                  </div>
                </div>
              )
            })}
          </div>
          {showForm &&
            <Modal
              title="Editar mesa"
              description="It's simply dummy text of the printing and typesetting industry."
              onCloseModal={() => setShowForm(false)}
            >
              <TableForm 
                table={currentTable}
                callBack={(newTable) => {
                  setShowForm(false)
                  setTables([newTable, ...tables.filter(table => table.id !== currentTable.id)])
                }}
                onDelete={(deletedTable) => {
                  console.log('Deletedtable',deletedTable)
                  setShowForm(false)
                  setTables(tables.filter(table => table.id !== currentTable.id))
                }}
              />
            </Modal>
          }
        </WhiteBox>
      </div>
    </div>
  );
};

export default MyTables;
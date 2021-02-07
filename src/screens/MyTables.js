import React, { useContext, useState, useCallback } from 'react';
import SideBar from '../components/misc/SideBar';
import WhiteBox from '../components/misc/WhiteBox';
import AuthContext from '../contexts/AuthContext';
import TableImage from '../assets/img/table.svg'
import { getTables, addTable } from '../services/TableService';
import useFetchWithLoading from '../hooks/useFetchWithLoading';
import  Button from './../components/misc/Button';
import '../assets/stylesheets/MyTables.css'

const MyTables = () => {
  const [tables, setTables] = useState([])

  const fetchTables = useCallback(async () => {
    const [tablesResult] = await Promise.all([
      getTables()
    ])
      .then(values => values)
      .catch(e =>  console.log(e))

    setTables(tablesResult.data)

    return { tablesResult }
  }, [])

  const createTable = () => {
    console.log(tables.length)
    addTable({number: tables.length})
      .then(result => {
        setTables([...tables, result.data])
      })
      .catch(e => console.log(e))
  }

  const [loading, data] = useFetchWithLoading(fetchTables)

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
          <div className="row mt-3">
            {tables.map((table, i) => {
              console.log('mesas', tables)
              return (

                <div className="col-md-6 col-lg-4 mb-3" key={i}>
                <div className="card TableCard">
                  <img className="card-img-top" src={TableImage} alt="Card caption" />
                  <div className="card-body">
                    <h5>Mesa</h5>
                    <div>
                      <p className="m-0">Estado: </p>
                      <p className="m-0">Comensales: </p>
                    </div>
                  </div>
                </div>
              </div>
                // <div className="TableCard col-md-6 col-lg-4" key={i}>
                //   <img alt="table" className="tableImg" src={TableImage}></img>
                //   <p className="table-name">Mesa {table.tableNumber}</p>
                // </div>
              )
            })}
          </div>
       
        </WhiteBox>
        </div>
    </div>
  );
};

export default MyTables;
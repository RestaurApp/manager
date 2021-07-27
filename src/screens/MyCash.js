import React, { useState, useCallback } from 'react';
import SideBar from '../components/misc/SideBar';
import WhiteBox from '../components/misc/WhiteBox';
import { cashList, cashClosing } from '../services/CashService';
import useFetchWithLoading from '../hooks/useFetchWithLoading';
import Button from '../components/misc/Button';
import '../assets/stylesheets/MyTables.css';
import SpinnerModal from '../components/misc/SpinnerModal';

const MyCash = () => {
  const [list, setList] = useState([]);
 
  const fetchTables = useCallback(async () => {
    const [tablesResult] = await Promise.all([cashList()])
      .then((values) => {
        setList(values[0].data);
        return values;
      })
      .catch((e) => console.log(e));

    return { tablesResult };
  }, []);
 

  const [loading, data] = useFetchWithLoading(fetchTables);

  if (loading) {
    return <SpinnerModal />;
  }

  return (
    <div className="MyTables">
      
    </div>
  );
};

export default MyCash;

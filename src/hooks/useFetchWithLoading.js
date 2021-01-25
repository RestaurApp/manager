import { useState, useEffect, useRef } from 'react';

const useFetchWithLoading = fetchFn => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const mountRef = useRef(false);

  useEffect(() => {
    mountRef.current = true;
    return () => mountRef.current = false;
  });

  useEffect(() => { setLoading(true) }, [fetchFn]);

  useEffect(() => { data && setLoading(false) }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      const newData = await fetchFn();
      if (mountRef.current) setData(newData);
    }

    if (isLoading) {
      fetchData();
    }
  }, [isLoading, fetchFn]);

  const reload = () => !isLoading && setLoading(true);

  return [isLoading, data, mountRef.current, reload]
}

export default useFetchWithLoading;

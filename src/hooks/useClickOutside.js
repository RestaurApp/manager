import { useEffect } from 'react';

const useClickOutside = (wrapperRef, fn) => {
  console.log(wrapperRef)
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  });

  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      fn();
    }
  };
}

export default useClickOutside;
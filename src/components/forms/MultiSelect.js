import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const animatedComponents = makeAnimated();

const AnimatedMulti = ({ onChangeFn, options}) => {
  const formattedOptions =  options.map(option => { 
    return { value: option, label: option }
  })
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={[]}
      isMulti
      options={formattedOptions}
      onChange={(value) => onChangeFn(value)}
    />
  );
}

export default AnimatedMulti
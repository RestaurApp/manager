import React from 'react';
import '../../assets/stylesheets/WhiteBox.css'

const WhiteBox = ({ children, style, extraClassNames }) => {
  return (
    <div className={`WhiteBox ${extraClassNames ? extraClassNames : ''}`} style={style}>
      {children}
    </div>
  );
};

export default WhiteBox;
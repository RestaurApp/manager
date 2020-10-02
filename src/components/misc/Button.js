import React from 'react';
import '../../assets/stylesheets/Button.css'

const Button = ({ buttonType, text, action, type, outline }) => {
  return (
    <button 
      className={`Button Button-${type} ${outline ? 'outline' : ''}`} 
      type={buttonType} 
      onClick={() => action}
    >
      {text}
    </button>
  );
};

export default Button;
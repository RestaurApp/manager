import React from 'react';
import { Link } from 'react-router-dom';

import '../../assets/stylesheets/Button.css'

const Button = (props) => {
  const { buttonType, text, action, type, outline } = props
  return typeof action !== 'string'
    ? 
      <button 
        className={`Button Button-${type} ${outline ? 'outline' : ''}`} 
        type={buttonType} 
        onClick={action}
      >
        {text}
      </button>
    : action.startsWith('/')
      ? <Link 
          className={`Button Button-${type} ${outline ? 'outline' : ''}`}  
          type={buttonType} 
          to={action}
        >
          {text}
        </Link>
      : <a
          className={`Button Button-${type} ${outline ? 'outline' : ''}`}
          type={buttonType}
          href={action}
        >
          {text}
        </a>
};

export default Button;
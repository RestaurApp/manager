import React from 'react';
import Button from './Button';
import './../../assets/stylesheets/Card.css'

const Card = ({ img, title, description, action, button }) => {
  return (
    <div className={`Card ${action ? 'ActionCard' : ''}`} onClick={() => action}>
      <img src={img.src} alt={img.alt}/>
      <h3>{title}</h3>
      <p>{description}</p>
      {button && <Button type="primary" action={button.action} text={button.text}/> }
    </div>
  );
};

export default Card;
import React from 'react';
import UserImg from '../../assets/img/img_cook_hat.svg'
import '../../assets/stylesheets/SideBar.css'

const SideBar = () => {
  return (
    <nav id="sidebar">
      <div className="img bg-wrap text-center py-4" >
        <div className="user-logo">
          <div className="img" style={{ backgroundImage: `url(${UserImg}`}}></div>
          <h3>Catriona Henderson</h3>
        </div>
      </div>
      <ul className="list-unstyled components mb-5">
        <li className="active c-gray">
          <a href="/#"><i className="icon-user mr-2"/>Perfil de usuario</a>
        </li>
        <li className="c-gray">
          <a href="/#"><i className="icon-food mr-2"/>Menus activos</a>
        </li>
        <li className="c-gray ">
          <a href="/#"><i className="icon-user mr-2"/>Home</a>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
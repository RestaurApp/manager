import React from 'react';
import UserImg from '../../assets/img/img_cook_hat.svg'
import '../../assets/stylesheets/SideBar.css'
import { Link } from 'react-router-dom';

const SideBar = ({ activeTab }) => {

  return (
    <nav id="sidebar">
      <div className="img bg-wrap text-center py-4" >
        <div className="user-logo">
          <div className="img" style={{ backgroundImage: `url(${UserImg}`}}></div>
          <h3>Catriona Henderson</h3>
        </div>
      </div>
      <ul className="list-unstyled components mb-5">
        <li className={`c-gray ${activeTab === 1 ? 'active' : ''}`}>
          <Link to="/dashboard"><i className="icon-user mr-2"/>Home</Link>
        </li>
        <li className={`c-gray ${activeTab === 2 ? 'active' : ''}`}>
          <Link to="/mymenus"><i className="icon-food mr-2"/>Menus activos</Link>
        </li>
        <li className={`c-gray ${activeTab === 3 ? 'active' : ''}`}>
          <Link to="/mydishes"><i className="icon-food mr-2"/>Platos Activos</Link>
        </li>
        <li className={`c-gray ${activeTab === 5 ? 'active' : ''}`}>
          <Link to="/mytables"><i className="icon-user mr-2"/>Mesas</Link>
        </li>
        <li className={`c-gray ${activeTab === 4 ? 'active' : ''}`}>
          <Link to="/profile"><i className="icon-user mr-2"/>Perfil</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
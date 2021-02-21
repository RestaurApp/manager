import React from 'react';
import UserImg from '../../assets/img/img_cook_hat.svg'
import '../../assets/stylesheets/SideBar.css'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext'

const SideBar = ({ activeTab }) => {

  const { currentUser } = useAuthContext()
console.log(currentUser);
  return (
    <nav id="sidebar">
      <div className="img bg-wrap text-center py-4" >
        <div className="user-logo">
          <div className="img" style={{ backgroundImage: `url(${currentUser.newUser.restaurants[0].picture}`}}></div>
          <h3>{currentUser.newUser.restaurants[0].name}</h3>
        </div>
      </div>
      <ul className="list-unstyled components mb-5">
        <li className={`c-gray ${activeTab === 1 ? 'active' : ''}`}>
          <Link to="/dashboard"><i className="icon-user mr-2"/>Home</Link>
        </li>
        <li className={`c-gray ${activeTab === 2 ? 'active' : ''}`}>
          <Link to="/mymenus"><i className="icon-food mr-2"/>Menus</Link>
        </li>
        <li className={`c-gray ${activeTab === 3 ? 'active' : ''}`}>
          <Link to="/mydishes"><i className="icon-dish mr-2"/>Platos</Link>
        </li>
        <li className={`c-gray ${activeTab === 4 ? 'active' : ''}`}>
          <Link to="/mycategories"><i className="icon-dish mr-2"/>Categorías</Link>
        </li>
        <li className={`c-gray ${activeTab === 5 ? 'active' : ''}`}>
          <Link to="/mytables"><i className="icon-table mr-2"/>Mesas</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
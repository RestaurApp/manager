import React from 'react';
import '../../assets/stylesheets/SideBar.css'

const SideBar = () => {
  return (
    <nav id="sidebar">
      <div className="custom-menu">
        <button type="button" id="sidebarCollapse" className="btn btn-primary">
        </button>
      </div>
      <div className="img bg-wrap text-center py-4" >
        <div className="user-logo">
          <div className="img"></div>
          <h3>Catriona Henderson</h3>
        </div>
      </div>
      <ul className="list-unstyled components mb-5">
        <li className="active">
          <a href="/#"><span className="fa fa-home mr-3"></span> Home</a>
        </li>
        <li>
            <a href="/#"><span className="fa fa-download mr-3 notif"><small className="d-flex align-items-center justify-content-center">5</small></span> Download</a>
        </li>
        <li>
          <a href="/#"><span className="fa fa-gift mr-3"></span> Gift Code</a>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
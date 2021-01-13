import React, { useContext, useState } from 'react';
import SideBar from '../components/misc/SideBar';
import WhiteBox from '../components/misc/WhiteBox';
import AuthContext from '../contexts/AuthContext';
import Modal from '../components/misc/Modal';
import MenuForm from '../components/forms/MenuForm';
import AddMenuImg from './../assets/img/addmenu.png'
import MenuImg from './../assets/img/iconMenu.png'
import './../assets/stylesheets/MyMenus.css'

const MyMenus = () => {
  const { currentUser } = useContext(AuthContext) 
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="MyMenus">
      <SideBar activeTab={2} />
      <div className="content p-4 p-md-5 pt-5">
        <WhiteBox>
          <h2 className="mb-4 c-dark-gray">Hola de nuevo <span className="c-red">{currentUser.name}!</span></h2>
          <p>
            It's simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </WhiteBox>
        <WhiteBox extraClassNames="mt-4">
          <h2 className="mt-2 mb-4 c-dark-gray">Tus menús activos</h2>
          <div className="MenusList row">
            <div onClick={() => setShowModal(true)} className="col-3">
              <img className="add-menu-img" alt="add your menu" src={AddMenuImg}/>
            </div>
            <div className="col-3 menu-wrapper">
              <img className="menu-img" alt="add your menu" src={MenuImg}/>
              <p className="menu-name">Menu name</p>
            </div>
            <div className="col-3 menu-wrapper">
              <img className="menu-img" alt="add your menu" src={MenuImg}/>
              <p className="menu-name">Menu name</p>
            </div>
            <div className="col-3 menu-wrapper">
              <img className="menu-img" alt="add your menu" src={MenuImg}/>
              <p className="menu-name">Menu name</p>
            </div>
            <div className="col-3 menu-wrapper">
              <img className="menu-img" alt="add your menu" src={MenuImg}/>
              <p className="menu-name">Menu name</p>
            </div>
            <div className="col-3 menu-wrapper">
              <img className="menu-img" alt="add your menu" src={MenuImg}/>
              <p className="menu-name">Menu name</p>
            </div>
            <div className="col-3 menu-wrapper">
              <img className="menu-img" alt="add your menu" src={MenuImg}/>
              <p className="menu-name">Menu name</p>
            </div>
            <div className="col-3 menu-wrapper">
              <img className="menu-img" alt="add your menu" src={MenuImg}/>
              <p className="menu-name">Menu name</p>
            </div>
          </div>
        </WhiteBox>
        {showModal &&
          <Modal 
            title="Modal" 
            description="It's simply dummy text of the printing and typesetting industry." 
            onCloseModal={() => setShowModal(false)}
            cancelBtn="hola"
          >
            <MenuForm/>
          </Modal>
        }
      </div>
    </div>
  );
};

export default MyMenus;
import React from 'react';
import SideBar from '../components/misc/SideBar';
import WhiteBox from '../components/misc/WhiteBox';
import AddMenuImg from './../assets/img/addmenu.png'
import './../assets/stylesheets/MyMenus.css'

const MyMenus = () => {
  return (
    <div className="MyMenus">
      <SideBar activeTab={2} />
      <div className="content p-4 p-md-5 pt-5">
        <WhiteBox>
          <h2 className="mb-4 c-dark-gray">Hola de nuevo <span className="c-red">Catriona!</span></h2>
          <p>
            It's simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </WhiteBox>
        <WhiteBox extraClassNames="mt-4">
          <h2 className="mt-2 mb-4 c-dark-gray">Tus menús activos</h2>
          <div className="MenusList row">
            <div className="col-4">
             <img className="add-menu-img" alt="add your menu" src={AddMenuImg}/>
            </div>
          </div>
          
        </WhiteBox>
      </div>
    </div>
  );
};

export default MyMenus;
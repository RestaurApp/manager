import React from 'react';
import SideBar from '../components/misc/SideBar';
import WhiteBox from '../components/misc/WhiteBox';
import Card from '../components/misc/Card';
import CreateMenuImg from './../assets/img/mobile_menu.png'
import seeMenusImg from './../assets/img/food_list.svg'
import './../assets/stylesheets/DashBoard.css'

const DashBoard = () => {
  return (
    <div className="DashBoard wrapper d-flex align-items-stretch">
      <SideBar/>
      <div id="content" class="p-4 p-md-5 pt-5">
        <WhiteBox >
          <h2 className="mt-2 mb-4 c-dark-gray">Hola de nuevo <span className="c-red">Catriona!</span></h2>
          <p>
            It's simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
          <div className="row mt-5">
            <div className="col-6">
              <Card
                action="TODO-REDIRECT TO MENUS-CREATION"
                img={{ src: CreateMenuImg, alt: 'create menu' }}
                title="Configura tu menú"
                description="Crea platos, menús, ofertas y secciones para tus comensales."
              />
            </div>
            <div className="col-6">
              <Card
                action="TODO-REDIRECT TO MENUS-LIST"
                img={{ src: seeMenusImg, alt: 'create menu' }}
                title="Configura tu menú"
                description="Crea platos, menús, ofertas y secciones para tus comensales."
              />
            </div>
          </div>
        </WhiteBox>
      </div>
    </div>
  );
};

export default DashBoard;
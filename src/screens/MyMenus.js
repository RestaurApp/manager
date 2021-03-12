import React, {useState, useCallback } from 'react';
import SideBar from '../components/misc/SideBar';
import WhiteBox from '../components/misc/WhiteBox';
import Modal from '../components/misc/Modal';
import MenuForm from '../components/forms/MenuForm';
import AddMenuImg from './../assets/img/addmenu.png'
import MenuImg from './../assets/img/iconMenu.png'
import './../assets/stylesheets/MyMenus.css'
import useFetchWithLoading from '../hooks/useFetchWithLoading';
import { getMenus } from '../services/MenuService';
import SpinnerModal from '../components/misc/SpinnerModal';
import EditMenuForm from '../components/forms/EditMenuForm';

const MyMenus = () => {
  const [showModal, setShowModal] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [menus, setMenus] = useState([])
  const [showEditForm, setShowEditForm] = useState(false)

  const [loading, data] = useFetchWithLoading(
    useCallback(async () => {
      const menus = await Promise.all([
        getMenus(),
      ])
        .then(values => {
          return values;
        }
        );

      setMenus(menus[0].data)

      return {
        menus
      }
    }, [])
  )

  if (loading) {
    return <SpinnerModal />
  }

  return (
    <div className="MyMenus">
      <SideBar activeTab={2} />
      <div className="content p-4 p-md-5 pt-4">
        <WhiteBox extraClassNames="mt-4">
          <h2 className="mt-2 mb-4 c-dark-gray">Tus menús activos</h2>
          <p className="pb-3">
            It's simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
          <div className="MenusList row">
            <div onClick={() => setShowModal(true)} className="col-3">
              <img className="add-menu-img" alt="add your menu" src={AddMenuImg} />
            </div>
            {data && menus.map((menu, i) => {

              return (
                <div
                  className="col-3 menu-wrapper"
                  key={i}
                  onClick={() => {
                    setActiveMenu(menu)
                    setShowEditForm(true)
                  }}
                >
                  <img className="menu-img" alt="add your menu" src={MenuImg} />
                  <p className="menu-name">{menu.name}</p>
                </div>
              )
            })
            }
          </div>
        </WhiteBox>
        {showModal && !showEditForm &&
          <Modal
            id="create-menu-modal"
            title="Modal"
            description="It's simply dummy text of the printing and typesetting industry."
            onCloseModal={() => setShowModal(false)}
            cancelBtn="hola"
          >
            <MenuForm onPost={(menu) => {
              setMenus([...menus, menu])
              setShowModal(false)
              }} />
          </Modal>
        }
        {!showModal && showEditForm &&
          <Modal
            id="edit-menu-modal"
            title="Modal"
            description="It's simply dummy text of the printing and typesetting industry."
            onCloseModal={() => setShowEditForm(false)}
            cancelBtn="hola"
          >
            <EditMenuForm menu={activeMenu} onPost={(menu) =>{
                setMenus([menu, ...menus.filter(m => m.id !== menu.id)])
                setShowEditForm(false)
              }}
              onDelete={(menu) => {
                console.log(menu)
                setMenus([...menus.filter(m => m.id !== menu.id)])
                setShowEditForm(false)
              }}
            />
          </Modal>
        }
      </div>
    </div>
  );
};

export default MyMenus;
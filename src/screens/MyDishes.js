import React, { useContext, useState, useCallback } from 'react';
import SideBar from '../components/misc/SideBar';
import WhiteBox from '../components/misc/WhiteBox';
import AuthContext from '../contexts/AuthContext';
import DefaultImg from '../assets/img/default-img.png'
import Modal from '../components/misc/Modal';
import TableRow from '../components/misc/TableRow';
import RegisterDishesForm from '../components/forms/MenuDishes';
import useFetchWithLoading from '../hooks/useFetchWithLoading';
import { getProducts } from '../services/ProductService';
import SpinnerModal from '../components/misc/SpinnerModal';
import Button from '../components/misc/Button';
import '../assets/stylesheets/MyDishes.css'
import CategoryForm from '../components/forms/CategoryForm';

const MyMenus = () => {
  const { currentUser } = useContext(AuthContext) 
  const [showModal, setShowModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const fetchProducts = useCallback(() => getProducts(currentUser.token), [currentUser.token])
  const [loading, products] = useFetchWithLoading(fetchProducts)

  console.log(loading, products)

  if (loading) {
    return <SpinnerModal/>
  }
  
  return (
    <div className="MyMenus">
      <SideBar activeTab={3} />
      <div className="content p-4 p-md-5 pt-5">
        <WhiteBox>
          <h2 className="mb-4 c-dark-gray">Hola de nuevo <span className="c-red">{currentUser.name}!</span></h2>
          <p>
            It's simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </WhiteBox>
        <WhiteBox extraClassNames="mt-4">
          <div className="mt-2 mb-4">
            <h2 className="c-dark-gray">Categorias Activas</h2>
            <p>
              It's simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
            <Button text="Crear una categoría" action={() => setShowCategoryModal(true)} type="primary" />
          </div>
          <hr className="mt-3 mb-4"></hr>
          <div className="row">
            <div className="col-xl-4 col-6">
              <div className="card">
                <img className="card-img-top" src={DefaultImg} alt="Card caption"/>
                <div className="card-body">
                  <h5 >Primeros Platos</h5>
                  <p className="text-small">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <button
                    onClick={() => setShowModal(true)}
                    className="btn c-white border-red w-100 bg-red"
                    >Go somewhere</button>
                </div>
              </div>
            </div>
          </div>
        
        </WhiteBox>
        {showModal && !showCategoryModal &&
          <Modal 
            title="Modal" 
            description="It's simply dummy text of the printing and typesetting industry." 
            onCloseModal={() => {
              setShowModal(false)
              setShowForm(false)
            }}
            cancelBtn="hola"
          > 
          {showForm 
            ? <RegisterDishesForm/>
            : <div>
                <WhiteBox extraClassNames="DishesList px-3 py-1">
                  <TableRow/>
                </WhiteBox>
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-4 btn c-white border-red w-100 bg-red"
                >
                  Añadir Nuevo
                </button>
              </div>
          }
          </Modal>
        }
        {!showModal && showCategoryModal &&
          <Modal 
            title="Modal category" 
            description="It's simply dummy text of the printing and typesetting industry." 
            onCloseModal={() => {
              setShowCategoryModal(false)
            }}
            cancelBtn="hola"
          >
            <CategoryForm/>
          </Modal> 
        }
      </div>
    </div>
  );
};

export default MyMenus;
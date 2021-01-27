import React, { useState, useCallback } from 'react';
import SideBar from '../components/misc/SideBar';
import WhiteBox from '../components/misc/WhiteBox';
import DefaultImg from '../assets/img/default-img.png'
import Modal from '../components/misc/Modal';
import DishRow from '../components/misc/DishRow';
import RegisterDishesForm from '../components/forms/MenuDishes';
import useFetchWithLoading from '../hooks/useFetchWithLoading';
import { getProducts, getProductsFromCategory } from '../services/ProductService';
import { getCategories } from '../services/CategoryService';
import SpinnerModal from '../components/misc/SpinnerModal';
import Button from '../components/misc/Button';
import CategoryForm from '../components/forms/CategoryForm';
import '../assets/stylesheets/MyDishes.css'

const MyMenus = () => {
  const [showModal, setShowModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [dishes, setDishes] = useState([])
  const [currentCategory, setCurrentCategory] = useState(null)
  const [showForm, setShowForm] = useState(false)
  
  const handleShowModal = (category) => {
    setCurrentCategory(category)

    getProductsFromCategory(category.id)
      .then((results) => {
        setShowModal(true)
        setDishes(results.data)
      })
      .catch((error) => console.log(error))
  }

  const [loading, data] = useFetchWithLoading(
    useCallback(async () => {
      const [products, categories] = await Promise.all([
        getProducts(),
        getCategories(),
      ])
        .then(values => {
          return values;
        }
        );
      return {
        products,
        categories
      }
    }, [])
  )

  if (loading) {
    return <SpinnerModal />
  }

  return (
    <div className="MyMenus">
      <SideBar activeTab={3} />
      <div className="content p-4 p-md-5 pt-5">
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
            {data && data.categories.data.map((category, i) => {
              return (
                <div className="col-md-6 col-lg-4 mb-3" key={i}>
                  <div className="card">
                    <img className="card-img-top" src={DefaultImg} alt="Card caption" />
                    <div className="card-body">
                      <h5>{category.name}</h5>
                      <p className="text-small">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <button
                        onClick={() => handleShowModal(category)}
                        className="btn c-white border-red w-100 bg-red">
                          Añadir Plato
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
            }
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
              ? <RegisterDishesForm 
                  category={currentCategory} 
                  onSubmitCb={() => {
                    setShowModal(false)
                    setShowForm(false)
                  }}
                />
              : <div>
                <WhiteBox extraClassNames="DishesList px-3 py-1">
                  {dishes.length
                    ? dishes.map((dish, i) => {
                      return <DishRow key={i} title={dish.name} />
                    })
                    : <p className="m-0 text-center p-2">"Está categoría no tiene platos asignados"</p>
                  }
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
            <CategoryForm callBack={setShowCategoryModal} />
          </Modal>
        }
      </div>
    </div>
  );
};

export default MyMenus;
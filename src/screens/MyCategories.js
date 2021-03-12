import React, { useState, useCallback } from 'react';
import SideBar from '../components/misc/SideBar';
import WhiteBox from '../components/misc/WhiteBox';
import DefaultImg from '../assets/img/default-img.png'
import Modal from '../components/misc/Modal';
import DishRow from '../components/misc/DishRow';

import useFetchWithLoading from '../hooks/useFetchWithLoading';
import { getProductsFromCategory, getProducts, updateProduct } from '../services/ProductService';
import { getCategories } from '../services/CategoryService';
import SpinnerModal from '../components/misc/SpinnerModal';
import Button from '../components/misc/Button';
import CategoryForm from '../components/forms/CategoryForm';
import '../assets/stylesheets/MyCategories.css'

const MyCategories = () => {
  const [showModal, setShowModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [dishes, setDishes] = useState([])
  const [allDishes, setAllDishes] = useState([])
  const [currentCategory, setCurrentCategory] = useState(null)
  const [showDishForm, setShowDishForm] = useState(false)
  const [categories, setCategories] = useState([])

  const addDishToCategory = (id) => {
    updateProduct({ category: currentCategory.id }, id)
      .then(result => {
        const newDishes = allDishes.map(e =>  e.id === id ? {...e, category: currentCategory.id} : e )
        setAllDishes(newDishes)
        setDishes([...dishes, result.data])
      })
  }

  const deleteDish = (id, callBack) => {
    updateProduct({ category: null }, id)
      .then(product => {
        console.log(product)
        const newDishes = allDishes.map(e =>  e.id === id ? {...e, category: null} : e )
        setAllDishes(newDishes)
        setDishes([...dishes.filter(e => e.id !== product.data.id)])
        callBack(false)
      })
      .catch(e => console.log(e))
  }

  const updateCategories = (result) => {
    setCategories([...categories, result.data])
    setShowCategoryModal(false)
  }

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
      const [categories, dishes] = await Promise.all([
        getCategories(),
        getProducts()
      ])
        .then(values => {
          return values;
        }
        );

      setCategories(categories.data)
      setAllDishes(dishes.data)
      
      return {
        categories,
        dishes
      }
    }, [])
  )

  if (loading) {
    return <SpinnerModal />
  }

  return (
    <div className="MyMenus">
      <SideBar activeTab={4} />
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
            {data && categories.map((category, i) => {
              const img = category.picture ? category.picture : DefaultImg
              return (
                <div className="col-md-6 col-lg-4 mb-3" key={i}>
                  <div className="card">
                    <img className="card-img-top" src={category.picture} alt="Card caption" />
                    <div className="card-body">
                      <h5>{category.name}</h5>
                      <p className="text-small">{category.description}</p>
                      <button
                        onClick={() => handleShowModal(category)}
                        className="btn c-white border-red w-100 bg-red"
                      >
                        Ver categoría
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
              setShowDishForm(false)
            }}
          >
            <div>
              {showDishForm
                ?
                <div>
                  <WhiteBox extraClassNames="DishesList px-3 py-1">
                    {data.dishes.data.length
                      ? allDishes.map((dish, i) => {
                        return (
                          <DishRow
                            defaultDeleted={false}
                            selected={dish.category === currentCategory.id}
                            addRow 
                            addDishAction={addDishToCategory} 
                            key={i} 
                            dish={dish}
                            onDelete={deleteDish} 
                          />
                        )
                      })
                      : <p className="m-0 text-center p-2">"Aún no tienes platos creados"</p>
                    }
                  </WhiteBox>
                  <button
                    onClick={() => setShowDishForm(false)}
                    className="mt-4 btn c-white border-red w-100 bg-red"
                  >
                    Ver categoría
                  </button> 
                </div>
               
                :
                <div>
                  <WhiteBox extraClassNames="DishesList px-3 py-1">
                    {dishes.length
                      ? dishes.map((dish, i) => {
                        return (
                          <DishRow 
                            key={i} 
                            dish={dish}  
                            onDelete={deleteDish} 
                          />
                        )
                      })
                      : <p className="m-0 text-center p-2">"Está categoría no tiene platos asignados"</p>
                    }
                  </WhiteBox>
                  <button
                    onClick={() => setShowDishForm(true)}
                    className="mt-4 btn c-white border-red w-100 bg-red"
                  >
                    Añadir Nuevo
                  </button> 
                </div>
              }
            </div>
          </Modal>
        }
        {!showModal && showCategoryModal &&
          <Modal
            title="Modal category"
            description="It's simply dummy text of the printing and typesetting industry."
            onCloseModal={() => {
              setShowCategoryModal(false)
            }}
          >
            <CategoryForm callBack={updateCategories} />
          </Modal>
        }
      </div>
    </div>
  );
};

export default MyCategories;
import React, { useState, useCallback } from 'react';
import SideBar from '../components/misc/SideBar';
import WhiteBox from '../components/misc/WhiteBox';
import Modal from '../components/misc/Modal';
import RegisterDishesForm from '../components/forms/MenuDishes';
import RegisterOptionsForm from '../components/forms/MenuDishesOptions';
import useFetchWithLoading from '../hooks/useFetchWithLoading';
import { getProducts, deleteProduct } from '../services/ProductService';
import { getCategories } from '../services/CategoryService';
import SpinnerModal from '../components/misc/SpinnerModal';
import Button from '../components/misc/Button';
import DefaultImg from '../assets/img/default-img.png';
import '../assets/stylesheets/MyDishes.css';

import { PaginatedList } from 'react-paginated-list';
import EditDishesForm from '../components/forms/EditDishesForm';

const MyDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentDish, setCurrentDish] = useState('');
  const [showDeleteDishModal, setShowDeleteDishModal] = useState(false);
  const [step, setStep] = useState(false);

  const deleteDish = (id) => {
    deleteProduct(id)
      .then(() => {
        const filteredDishes = dishes.filter((e) => e.id !== id);
        setDishes(filteredDishes);
        setShowDeleteDishModal(false);
      })
      .catch((e) => console.log(e));
  };

  const getDynamicCategory = (id) => {
    const foundCategory = categories.find((category) => category.id === id);
    return foundCategory ? foundCategory.name : 'Sin asociar';
  };

  const fetchDishes = useCallback(async () => {
    const [products, categories] = await Promise.all([getProducts(), getCategories()]).then(
      (values) => values
    );
    setDishes(products.data);
    setCategories(categories.data);
    return { products };
  }, []);

  const [loading] = useFetchWithLoading(fetchDishes);

  const onStep1 = (dish) => {
    setDishes([dish, ...dishes]);
    setStep(dish.id);
  };
  const onStep2 = (dish) => {
    setDishes([dish, ...dishes]);
    console.log("object", dish);
    setShowForm(false);
  };
  if (loading) {
    return <SpinnerModal />;
  }

  return (
    <div className="MyMenus MyDishes">
      <SideBar activeTab={3} />
      <div className="content p-4 p-md-5 pt-5">
        {showForm && (
          <Modal title="Crea tu plato" onCloseModal={() => setShowForm(false)}>
            {!step ? (
              <RegisterDishesForm onSubmitCb={onStep1} closeModal={() => setShowForm(false)} />
            ) : (
              <RegisterOptionsForm
                id={step}
                onSubmitCb={(dish) => onStep2(dish)}
                closeModal={() => {
                  setStep();
                  setShowForm(false);
                }}
              />
            )}
          </Modal>
        )}

        {showEditForm && (
          <Modal
            title="Modal"
            description="It's simply dummy text of the printing and typesetting industry."
            onCloseModal={() => setShowEditForm(false)}
          >
            <EditDishesForm
              dish={currentDish}
              onSubmitCb={(dish) => {
                setDishes([dish, ...dishes.filter((d) => d.id !== dish.id)]);
                setShowEditForm(false);
              }}
            />
          </Modal>
        )}
        {showDeleteDishModal && (
          <Modal
            title="Modal"
            description={`¿Estas seguro de eliminar el plato con el nombre: ${currentDish.name}?`}
            onCloseModal={() => setShowDeleteDishModal(false)}
          >
            <div className="d-flex align-items-center justify-content-center">
              <Button type="primary" action={() => deleteDish(currentDish.id)} text="Eliminar" />
              <Button
                type="primary"
                outline
                action={() => setShowDeleteDishModal(false)}
                text="Cancelar"
              />
            </div>
          </Modal>
        )}

        <WhiteBox extraClassNames="mt-4">
          <div className="mt-2 mb-4">
            <h2 className="c-dark-gray">Tus Platos</h2>
            <p>
              It's simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
              the industry's standard dummy text ever since the 1500s, when an unknown printer took
              a galley of type and scrambled it to make a type specimen book.
            </p>
            <Button text="Crear un plato" type="primary" action={() => setShowForm(true)} />
          </div>
          {dishes.length ? (
            <PaginatedList
              list={dishes}
              itemsPerPage={5}
              renderList={(list) => (
                <table className="MyDishTable">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Categoría</th>
                      <th>Estado</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((dish, i) => {
                      return (
                        <tr key={i} className="TableDishRow">
                          <td>
                            <img
                              src={dish.picture || DefaultImg}
                              alt="img"
                              className="Dish-td-img"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = DefaultImg;
                              }}
                            />
                          </td>
                          <td>
                            <p className="m-0 Dish-td-name ">{dish.name}</p>
                          </td>
                          <td>{dish.price} €</td>
                          <td>
                            <p className="m-0 Dish-td-category">
                              {getDynamicCategory(dish.category)}
                            </p>
                          </td>
                          <td>{dish.state}</td>
                          <td
                            className="d-flex justify-content-center"
                            style={{ padding: '1rem 0' }}
                          >
                            <div
                              className="DishRowButton bg-light-green mr-1"
                              onClick={() => {
                                setCurrentDish(dish);
                                setShowEditForm(true);
                              }}
                            >
                              <i className="icon-pencil" />
                            </div>
                            <div
                              className="DishRowButton bg-cancel"
                              onClick={() => {
                                setShowDeleteDishModal(dish.id);
                                setCurrentDish(dish);
                              }}
                            >
                              <i className="icon-cancel" />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            />
          ) : (
            <div className="NoDishMessage">
              Tu restaurante no tiene platos asociados. ¡Empieza a crearlos!{' '}
            </div>
          )}
        </WhiteBox>
      </div>
    </div>
  );
};

export default MyDishes;

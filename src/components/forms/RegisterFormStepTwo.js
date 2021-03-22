import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { createRestaurant, updateRestaurant } from '../../services/RestaurantService';
import { createTables } from '../../services/TableService';
import AddressInput from './../misc/AddressInput';
import Button from './../misc/Button';
import AuthContext from '../../contexts/AuthContext';
import '../../assets/stylesheets/RegisterForm.css';

const RegisterForm = ({ profile, handleChange }) => {
  const { setAuthUser, currentUser } = useContext(AuthContext);
  const restaurant = currentUser?.restaurants && currentUser?.restaurants[0];
  const { handleSubmit, register, errors } = useForm();
  const [redirect, setRedirect] = useState();
  const [placeDetail, setPlaceDetail] = useState();
  const [value, setValue] = useState();

  const setupPlaceDetail = (data) => {
    const lat = !data?.geometry?.location?.lat ? null : data?.geometry?.location.lat();
    const lng = !data?.geometry?.location?.lng ? null : data?.geometry?.location.lng();

    const address = {
      formattedAddress: data.formatted_address,
      latitude: lat,
      longitude: lng,
      placeId: data.place_Id,
      vicinity: data.vicinity,
    };

    setPlaceDetail({
      address,
      location: { type: 'Point', coordinates: [lng, lat] },
    });
  };

  const fileUpload = (event) => {
    if (event.target.files[0]) {
      setValue(event.target.files[0]);
      profile && handleChange(null, true, event.target.files[0]);
    }
  };

  const onSubmit = async (values) => {
    try {
      const form = { ...values, ...placeDetail };

      const formData = new FormData();
      formData.append('picture', value);

      const result = await createRestaurant(form);

      const tableBody = {
        restaurantId: result.data.id,
        number: result.data.tablesNumber,
      };
      setAuthUser({...currentUser, restaurants: [result.data]})
     
      await createTables(tableBody);
      const response = value && (await updateRestaurant(result.data.id, formData));

      setAuthUser({...currentUser, restaurants: [response.data]})
     
    } catch (error) {
      console.log(error);
    } finally {
      setRedirect(true);
    }
  };

  const profileChange = (e) => {
    profile && handleChange(e, true)
  }
  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="RegisterForm" style={{ paddingTop: profile ? '0rem' : '3rem' }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        style={{ width: profile ? '100%' : 'auto' }}
      >
        <div className="row">
          {!profile ? (
            <div className="col-12 mb-4">
              <h2 className="StepOneTitle">
                Crea tu restaurante con <span>MyMenus</span>
              </h2>
              <p className="StepOneDescription">Regístrate para crear tu perfil privado</p>
            </div>
          ) : (
            <div className="col-12 mb-4">
              <p className="StepOneDescription">Actualiza los datos de tu restaurante</p>
            </div>
          )}
          <div className="col">
            <label htmlFor="name">Nombre restaurante</label>
            <input
              placeholder="Nombre"
              className="form-control"
              name="name"
              value={restaurant?.name}
              ref={register({ required: true })}
              onChange={(e) => profileChange(e, true)}
            />

            <p className="text-danger text-left">{errors.name && errors.name.message}</p>
          </div>
          <div className="col">
            <label htmlFor="lastname">Dirección</label>
            <AddressInput
              placeholder={restaurant?.address.length > 0 && restaurant?.address[0].formattedAddress ? restaurant?.address[0].formattedAddress : 'Introduce tu dirección'}
              setupPlaceDetail={setupPlaceDetail}
            />
            <p className="text-danger text-left">{errors.name && errors.name.message}</p>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label htmlFor="phone">Teléfono</label>
            <input
              placeholder="Teléfono"
              className="form-control"
              name="phone"
              value={restaurant?.phone}
              ref={register({ required: true })}
              onChange={(e) => profileChange(e, true)}
            />
            <p className="text-danger text-left">{errors.name && errors.name.message}</p>
          </div>
          <div className="col">
            <label htmlFor="email">Email</label>
            <input
              placeholder="Email del restaurante"
              className="form-control"
              name="email"
              value={restaurant?.email}
              onChange={(e) => profileChange(e, true)}
              ref={register({
                required: 'Required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'invalid email address',
                },
              })}
            />
            <p className="text-danger text-left">{errors.email && errors.email.message}</p>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label htmlFor="tables">Número de mesas</label>
            <input
              min={0}
              placeholder="0"
              className="form-control"
              name="tablesNumber"
              onChange={(e) => profileChange(e, true)}
              type="number"
              disabled={profile}
              value={restaurant?.tablesNumber}
              ref={register({ required: true })}
            />
            <p className="text-danger text-left">{errors.email && errors.email.message}</p>
          </div>

          <div className="col">
            <label htmlFor="food">Tipo de comida</label>
            <input
              placeholder="Tipo de comida"
              className="form-control"
              onChange={(e) => profileChange(e, true)}
              name="foodType"
              value={restaurant?.foodType}
              ref={register({ required: false })}
            />
            <p className="text-danger text-left">{errors.email && errors.email.message}</p>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label htmlFor="logo">Logo del restaurante</label>
            <input
              type="file"
              placeholder="logo restaurant"
              className="form-control"
              name="file"
              onChange={fileUpload}
            />
          </div>
        </div>
        {!profile && (
          <div className="Buttons-container">
            <Button buttonType="submit" text="Registrar" type="primary" />
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;

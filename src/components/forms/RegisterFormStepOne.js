import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../misc/Button';
import { registerUser } from '../../services/AuthService';
import AuthContext from '../../contexts/AuthContext';
import '../../assets/stylesheets/RegisterForm.css';

const RegisterFormStepOne = ({ setStep, profile, handleChange }) => {
  const { handleSubmit, register, errors } = useForm();
  const { setAuthUser, currentUser } = useContext(AuthContext);

  const onSubmit = (values) => {
    registerUser(values)
      .then((result) => {
        setAuthUser({...result.data.newUser, token: result.data.token, refreshToken: result.data.refreshToken})
        setStep(2);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="RegisterForm">
      <form onSubmit={handleSubmit(onSubmit)} className="w-100">
        <div className="row">
          {!profile ? (
            <div className="col-12 mb-4">
              <h2 className="StepOneTitle">
                Crea tu cuenta con <span>MyMenus</span>
              </h2>
              <p className="StepOneDescription">Regístrate para crear tu perfil privado</p>
            </div>
          ) : (
            <div className="col-12 mb-4">
              <h2 className="StepOneTitle">Mi perfil en <span>MyMenus</span></h2>
              <p className="StepOneDescription">Actualiza los datos de tu perfil</p>
            </div>
          )}
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Nombre"
              className="form-control"
              name="name"
              onChange={handleChange}
              value={currentUser?.name}
              ref={register({ required: true })}
            />
            {errors.name && (
              <p className="ErrorMessage text-danger mb-0 text-left">El nombre es requerido</p>
            )}
          </div>
          <div className="col">
            <label htmlFor="lastName">Last Name</label>
            <input
              placeholder="lastName"
              className="form-control"
              name="lastName"
              onChange={handleChange}
              value={currentUser?.lastName}
              ref={register({ required: true })}
            />
            {errors.lastName && (
              <p className="ErrorMessage text-danger mb-0 text-left">
                Los apellidos son requeridos
              </p>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label htmlFor="phone">Phone</label>
            <input
              placeholder="phone"
              className="form-control"
              value={currentUser?.phone}
              name="phone"
              onChange={handleChange}
              ref={register({ required: true })}
            />
            {errors.phone && (
              <p className="ErrorMessage text-danger mb-0 text-left">El teléfono es requerido</p>
            )}
          </div>
          <div className="col">
            <label htmlFor="email">Email address</label>
            <input
              placeholder="Enter email"
              className="form-control"
              name="email"
              disabled={profile}
              value={currentUser?.email}
              ref={register({
                required: 'Required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email no válido',
                },
              })}
            />
            <p className="ErrorMessage text-danger mb-0 text-left">
              {errors.email && errors.email.message}
            </p>
          </div>
        </div>
        {!profile && (
          <div className="row">
            <div className="col">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="password"
                ref={register({
                  required: 'Required',
                  minLength: {
                    value: 5,
                    message: 'Debe tener 5 caracteres',
                  },
                })}
              />
              <p className="ErrorMessage text-danger mb-0 text-left">
                {errors.password && errors.password.message}
              </p>
            </div>
          </div>
        )}
        {!profile && (
          <div className="Buttons-container">
            <Button type="primary" buttonType="submit" text="Submit" />
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterFormStepOne;

import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SideBar from '../components/misc/SideBar';
import WhiteBox from '../components/misc/WhiteBox';
import RegisterFormStepOne from '../components/forms/RegisterFormStepOne';
import RegisterFormStepTwo from '../components/forms/RegisterFormStepTwo';
import { updateRestaurant } from '../services/RestaurantService';
import { updateUser } from '../services/AuthService';
import Button from '../components/misc/Button';
import AuthContext from '../contexts/AuthContext';
import '../assets/stylesheets/MyDishes.css';
import '../assets/stylesheets/RegisterScreen.css';

const MyProfile = () => {
  const [file, setFile] = useState();
  const { setAuthUser, currentUser } = useContext(AuthContext);
  const history = useHistory();
  const handleChange = async (e, isRestaurant, file) => {
    if (file) {
      setFile(file);
    } else {
      const { value, name } = e.target;
      isRestaurant
        ? setAuthUser({
            ...currentUser,
            restaurants: [{ ...currentUser.restaurants[0], [name]: value }],
          })
        : setAuthUser({ ...currentUser, [name]: value });
    }
  };

  const onSubmit = async () => {
    try {
      await updateRestaurant(currentUser.restaurants[0].id, currentUser.restaurants[0]);
      if (file) {
        const formData = new FormData();
        formData.append('picture', file);
        const response = await updateRestaurant(currentUser.restaurants[0].id, formData);
        setAuthUser({ ...currentUser, restaurants: [response.data] });
      }
      delete currentUser['restaurants'];
      const responseUser = await updateUser(currentUser.id, currentUser);
      setAuthUser({...currentUser, ...responseUser.data});
    } catch (error) {
      console.log(error);
    } finally {
      history.push('/dashboard');
    }
  };

  return (
    <div className="MyMenus MyDishes">
      <SideBar activeTab={0} />
      <div className="content p-4 p-md-5 pt-5">
        <WhiteBox extraClassNames="mt-4">
          <RegisterFormStepOne profile handleChange={handleChange} />
          <RegisterFormStepTwo profile handleChange={handleChange} />
          <div className="d-flex justify-content-center">
            <Button type="primary" buttonType="submit" text="Actualizar" action={onSubmit} />
          </div>
        </WhiteBox>
      </div>
    </div>
  );
};

export default MyProfile;

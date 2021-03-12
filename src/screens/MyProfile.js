import React from 'react';
import SideBar from '../components/misc/SideBar';
import WhiteBox from '../components/misc/WhiteBox';
import RegisterFormStepOne from '../components/forms/RegisterFormStepOne';
import RegisterFormStepTwo from '../components/forms/RegisterFormStepTwo';
import Button from '../components/misc/Button';
import '../assets/stylesheets/MyDishes.css';
import '../assets/stylesheets/RegisterScreen.css';

const MyProfile = () => {
  return (
    <div className="MyMenus MyDishes">
      <SideBar activeTab={0} />
      <div className="content p-4 p-md-5 pt-5">
        <WhiteBox extraClassNames="mt-4">
          <RegisterFormStepOne profile/>
          <RegisterFormStepTwo profile/>
          <div className="d-flex justify-content-center">
            <Button type="primary" buttonType="submit" text="Actualizar" />
          </div>
        </WhiteBox>
      </div>
    </div>
  );
};

export default MyProfile;

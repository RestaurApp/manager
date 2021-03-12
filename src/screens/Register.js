import React, { useState, useContext } from 'react';
import RegisterFormStepOne from '../components/forms/RegisterFormStepOne'
import RegisterFormStepTwo from '../components/forms/RegisterFormStepTwo'
import bgGray from '../assets/img/background.png'
import MobileImg from '../assets/img/mobile.png'
import AuthContext from '../contexts/AuthContext';
import '../assets/stylesheets/RegisterScreen.css'

const RegisterScreen = () => {
  const { currentUser } = useContext(AuthContext) 

  const [step, setStep] = useState(currentUser ? 2 : 1)

  return (
    <div className="RegisterScreen">
      <div className="RegisterCard">
        <div className="row">
          <div className="ResgisterImageForm col-4" style={{ background:`url(${bgGray})`}}>
            <img alt="img" src={MobileImg}/>
          </div>
          <div className="col-8">
            {step === 1 && <RegisterFormStepOne setStep={setStep}/>}
            {step === 2 && <RegisterFormStepTwo/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
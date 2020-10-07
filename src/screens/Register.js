import React, { useState } from 'react';
import RegisterFormStepOne from '../components/forms/RegisterFormStepOne'
import RegisterFormStepTwo from '../components/forms/RegisterFormStepTwo'
import bgGray from '../assets/img/background.png'
import MobileImg from '../assets/img/mobile.png'
import '../assets/stylesheets/RegisterScreen.css'

const RegisterScreen = () => {
  const [step, setStep] = useState(1)

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
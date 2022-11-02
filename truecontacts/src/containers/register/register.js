import React, { useEffect } from 'react';
import RegisterUI from '../../layout/register/registerUI';
import useRegForm from '../../hooks/useRegForm';

const RegisterContainer = () => {
  useEffect(() => {
    
  },[]);
  return (
    <div>
      <RegisterUI form={useRegForm()}/>
    </div>
  )
}

export default RegisterContainer;
import React from 'react';
import LoginUI from '../../layout/login/loginUI';
import useLogForm from '../../hooks/useLogForm';

const LoginContainer = () => {
  return (
    <div>
      <LoginUI form={useLogForm()} />
    </div>
  )
}

export default LoginContainer;
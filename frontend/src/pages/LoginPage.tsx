import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const LoginPage = () => {
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        flexDirection: isLoginForm ? 'row' : 'row-reverse',
      }}
    >
      {isLoginForm ? (
        <LoginForm setIsLoginForm={setIsLoginForm} />
      ) : (
        <RegisterForm setIsLoginForm={setIsLoginForm} />
      )}
      <div
        style={{
          width: '50%',
          height: '100%',
          background: `${isLoginForm ? 'blue' : '#008000'}`,
          display: 'block',
        }}
      ></div>
    </div>
  );
};

export default LoginPage;

import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Auth = (props) => {
  const { onCloseModal, setTitleModal } = props;

  const [showLogin, setShowLogin] = useState(true);

  /* navegacion entre formularios */
  const showLoginForm = () => {
    setTitleModal("Iniciar sesión");
    setShowLogin(true);
  };
  const showRegisterForm = () => {
    setTitleModal("Crear una cuenta");
    setShowLogin(false);
  };

  return (
    <div>
      {showLogin ? (
        <LoginForm
          showRegisterForm={showRegisterForm}
          onCloseModal={onCloseModal}
        />
      ) : (
        <RegisterForm showLoginForm={showLoginForm} />
      )}
    </div>
  );
};

export default Auth;

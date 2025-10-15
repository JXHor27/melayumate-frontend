import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AuthForm ({ isLogin }) {
  return (
    <>
    {isLogin ? <LoginForm /> : <RegisterForm />}
    </>
  )
};

export default AuthForm;
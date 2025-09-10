import React from "react";
import LoginForm from "../Components/auth/LoginForm";
import BgLogin from "../assets/img/bg3.jpg";
function LoginPage() {
  return (
    <div className="	bg-[#eae0cc] relative " >
      <img src={BgLogin} alt="Please try again " className="block w-full h-[100vh] " />
      {/* <LoginForm /> */}
    </div>
  );
}

export default LoginPage;

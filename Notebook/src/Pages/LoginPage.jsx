import React from "react";
import LoginForm from "../Components/auth/LoginForm";
import BgLogin from "../assets/img/bg3.jpg";
import Dark_light from "../Components/dark_light_switch/Dark_light";
function LoginPage() {
  return (
    <div className="	bg-[#eae0cc] relative " >
      <img src={BgLogin} alt="Please try again " className="block w-full h-[100vh] " />
      {/* <LoginForm /> */}s
    </div>
  );
}

export default LoginPage;

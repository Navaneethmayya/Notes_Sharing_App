import { useState } from "react";
import "./App.css";
import Button from "./Components/Button/Buttons"; //label,varient,onClick,disabled
import { ToastContainer,toast } from 'react-toastify';
import LoginForm from "./Components/auth/LoginForm";
import Registerform from "./Components/auth/Registerform";


function App() {
  const [count, setCount] = useState(0);
  
  const type="";

  return (
    <>
      <div className="bg-amber-50">
        <p>Hello</p>
      </div>
      <Button label="Iam God" variant="danger" onClick={()=>toast("god is Great!!!!!!!!!!!")} />
      <Button type="submit" label="iam vinayaka"/>
       <ToastContainer position="top-right" autoClose={2000} />
       <Registerform/>
        
      
       
    </>
  );
}

export default App;

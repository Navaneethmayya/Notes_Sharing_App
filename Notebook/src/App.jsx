import { useState } from "react";
import "./App.css";
import Button from "./Components/Button/Buttons"; //label,varient,onClick,disabled
import { ToastContainer,toast } from 'react-toastify';


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
    
      <p></p>
       <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;

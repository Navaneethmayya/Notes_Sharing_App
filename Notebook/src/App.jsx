import { useState } from "react";
import "./App.css";
import Button from "./Components/Button/Buttons"; //label,varient,onClick,disabled
import { ToastContainer,toast } from 'react-toastify';
import SearchBar from "./Components/Searchbar/SearchBar";
import Registerform from "./Components/auth/Registerform";

import LoginPage from "./Pages/LoginPage";
import { Route, Routes } from "react-router-dom";

function App() {
  // const [count, setCount] = useState(0);
  
  // const type="";

  return (
    <>
      {/* <div className="bg-amber-50">
        <p>Hello</p>
      </div>
    
       <Registerform/>

        <LoginForm /> */}
       
        <ToastContainer position="top-right" autoClose={2000}  />
        <Routes>
        <Route path="/" element={<Registerform/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/search" element={<SearchBar/>}/>
    </Routes>
        

    </>
  );
}

export default App;

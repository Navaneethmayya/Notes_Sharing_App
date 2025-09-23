import { useState } from "react";
import "./App.css";
import Button from "./Components/Button/Buttons"; //label,varient,onClick,disabled
import { ToastContainer,toast } from 'react-toastify';
import SearchBar from "./Components/Searchbar/SearchBar";
import Registerform from "./Components/auth/Registerform";
import LoginForm from "./Components/auth/LoginForm";

import LoginPage from "./Pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import AuthorDasboard from "./Pages/AuthorDasboard";
import FlowPage from "./Pages/FlowPage";
import Testing from "./Pages/Testing";

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
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/authordashboard" element={<AuthorDasboard/>}/>
        <Route path="/search" element={<SearchBar/>}/>
        <Route path="/FlowPage" element={<FlowPage/>}/>
        <Route path="testing" element={<Testing/>}/>
        </Routes>

    </>
  );
}

export default App;

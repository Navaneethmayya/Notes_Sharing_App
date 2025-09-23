import React from "react";
import Profile from "../Profile/Profile";
import SearchBar from "../Searchbar/SearchBar";
import Dark_light from "../dark_light_switch/Dark_light";
import "./Navbar.css"
const Navbar = () => {
  return (
    <div className='navbar_root'>
      <Profile/>
      <SearchBar/>
      <Dark_light/>
    </div>
  );
};

export default Navbar;

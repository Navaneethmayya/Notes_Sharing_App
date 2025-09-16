import React from "react";
import Profile from "../Profile/Profile";
import SearchBar from "../Searchbar/SearchBar";
import Dark_light from "../dark_light_switch/Dark_light";

const Navbar = () => {
  return (
    <div className='flex align-middle justify-around mt-9 h-20'>
      <Profile/>
      <SearchBar/>
      <Dark_light/>
    </div>
  );
};

export default Navbar;

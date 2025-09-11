import React, { useContext, useEffect, useRef, useState } from "react";
import "./Dark_light.css";
import { ThemeContext } from "../../Context/ThemeContext";




const Dark_light = () => {
 const { theme, setTheme } = useContext(ThemeContext);

  function toggleBtn() {
    setTheme(theme==="light"?"dark":"light");
    console.log(theme);
    
    // console.log("Theme switched to:", theme === "light" ? "dark" : "light");
  }
  return (
    <div className="align_to_center">
      <div className="switch">
        <input type="checkbox" className="switch__input" id="Switch" onClick={toggleBtn} />
        <label className="switch__label" htmlFor="Switch">
          <span className="switch__indicator"></span>
          <span className="switch__decoration"></span>
        </label>
      </div>
    </div>
  );
};

export default Dark_light;

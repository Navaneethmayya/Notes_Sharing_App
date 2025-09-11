import React, { useEffect, useState } from 'react'
import { ThemeContext } from './ThemeContext'

const ThemeProvider = ({children}) => {
    const [theme,setTheme]=useState("light");
    useEffect(()=>{
        if(theme==="light"){
            document.body.classList.add("dark")
        }
        else{
            document.body.classList.remove("dark");
        }
        
    },[theme]);
  return (
    <ThemeContext.Provider value={{theme,setTheme}}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider

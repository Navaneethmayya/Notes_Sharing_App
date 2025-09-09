import React from "react";
import { ToastContainer, toast } from 'react-toastify';
 
function Button({ label,type, onClick, variant = "primary", disabled = false,children, }) {
  // Base button style
  const baseStyle = "px-4 py-2 rounded text-white font-medium transition";

  // Simple variant styles
  const styles = {
    primary: "bg-blue-600 hover:bg-blue-700",
    secondary: "bg-gray-500 hover:bg-gray-600",
    danger: "bg-red-500 hover:bg-red-600",
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      type={type}    
      
      className={`
        ${baseStyle} 
        ${styles[variant]} 
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
     {/* if children exist (like an icon), render them. Otherwise use label */}
      {children || label}
    </button>
  );
}

export default Button;

////////////////////////////// Read me ///////////////////////////////

/* example usages
<Button label="Submit" variant="primary" onClick={() => alert("Submitted!")} />

  <Button label="Iam God" variant="danger" onClick={()=>toast("god is Great!!!!!!!!!!!")} />
  
  <Button type="submit" label="iam vinayaka"/>
       
*/

////////////////////////////// Read me ///////////////////////////////

import React, { useState, useRef } from "react";
import { Spinner } from "reactstrap";
import "./Profile.css";
function Profile() {
  const [spinner, setSpinner] = useState(false);
  const [image,setImage] = useState("");
  const timerRef = useRef(null);
  const inputRef = useRef(null);
  const visibleRef=useRef(false);

  const startPress = () => {
    timerRef.current = setTimeout(() => setSpinner(true), 1000);
  };

  const cancelPress = () => clearTimeout(timerRef.current);

  const handleDoubleClick = () => setSpinner(false);
  const handleOutsideClick = (e) => {
    if (!e.target.closest(".profile_container")) setSpinner(false);
  };

 const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const previewUrl = URL.createObjectURL(file);
    setImage(previewUrl);

    // Cleanup: revoke object URL later
    return () => URL.revokeObjectURL(previewUrl);
  }
};


  React.useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="profile_container">
    <div className="profile_holder">
      <div className="profile_img_holder">

      <img
        src={image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
        alt="profile"
        className="profile_img"
        onMouseDown={startPress}
        onMouseUp={cancelPress}
        onMouseLeave={cancelPress}
        onDoubleClick={handleDoubleClick}
        onClick={()=>visibleRef && inputRef.current.click()}
        />
      </div>
      
    </div>
    {spinner && (
        visibleRef.current = true,
        <div className="loader">
          <Spinner color="primary" type="grow" />
          <input type="file" accept="image/*" name="img" id="profile_img" ref={inputRef} onChange={handleImageChange} style={{display:"none"}} />
          
        </div>
      )}
      </div>
  );
}

export default Profile;
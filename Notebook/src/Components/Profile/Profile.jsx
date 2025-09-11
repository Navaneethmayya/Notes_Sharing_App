import React, { useState, useRef } from "react";
import { Spinner } from "reactstrap";
import "./Profile.css";
import { useNavigate } from "react-router-dom";


/////////////////////// readm me ////////////////////////////
/*how to use
  -- onclick === naivgate to dashboard 
  -- onMouseDown(hold 1sec)   === open file window to add image
      |  
      |-- onClick  === again open file window
      
  -- onClick(outside component) === close file window */

/////////////////////// readm me ////////////////////////////


function Profile() {
  const [spinner, setSpinner] = useState(false);
  const [image, setImage] = useState("");
  const timerRef = useRef(null);
  const inputRef = useRef(null);

  const navigate = useNavigate();
  const startPress = () => {
    timerRef.current = setTimeout(() => {
      setSpinner(true);
    }, 1000);
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
      console.log(previewUrl);
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
            src={
              image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profile"
            className="profile_img"
            onMouseDown={startPress}
            onMouseUp={cancelPress}
            onMouseLeave={cancelPress}
            onDoubleClick={handleDoubleClick}
            onClick={() =>
              spinner ? inputRef.current.click() : navigate("/authorDashboard")
            }
          />
        </div>
      </div>
      {spinner && (
        <div className="loader">
          <Spinner color="primary" type="grow" />
          <input
            type="file"
            accept="image/*"
            name="img"
            id="profile_img"
            ref={inputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>
      )}
    </div>
  );
}

export default Profile;
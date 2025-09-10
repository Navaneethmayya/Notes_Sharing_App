import React, { useState, useRef } from "react";
import { Spinner } from "reactstrap";
import "./Profile.css";
function Profile() {
  const [spinner, setSpinner] = useState(false);
  const timerRef = useRef(null);
  const inputRef = useRef(null);
  const visibleRef=useRef(false);
  const startPress = () => {
    timerRef.current = setTimeout(() => setSpinner(true), 1000);
  };

  const cancelPress = () => clearTimeout(timerRef.current);

  const handleDoubleClick = () => setSpinner(false);
  const handleOutsideClick = (e) => {
    if (!e.target.closest(".profile_holder")) setSpinner(false);
  };

  React.useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="profile_holder">
      <img
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        alt="profile"
        className="profile_img"
        onMouseDown={startPress}
        onMouseUp={cancelPress}
        onMouseLeave={cancelPress}
        onDoubleClick={handleDoubleClick}
        onClick={()=>visibleRef && inputRef.current.click()}
      />
      {spinner && (
        visibleRef.current = true,
        <div>
          <Spinner color="primary" type="grow" />
          <input type="file" name="img" id="profile_img" ref={inputRef} />
        </div>
      )}
    </div>
  );
}

export default Profile;

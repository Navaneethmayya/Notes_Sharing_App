import React from "react";
import "./Profile.css";
import { Spinner } from "reactstrap";
import { toast } from "react-toastify";
import { start } from "node:repl";
function Profile() {
  const [spinner, setSpinner] = React.useState(false);
 const startPress = () => {
    timerRef.current = setTimeout(() => {
      onLongPress(); // call the function when held
    }, 2000);
    
  };

  const endPress = () => {
    clearTimeout(timerRef.current);
  };
  return (
    <>
      <div className="profile_holder">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="profile"
          className="profile_img"
          onMouseDown={startPress}
          onMouseUp={endPress}
          onMouseLeave={endPress}
          onTouchStart={startPress}
          onTouchEnd={endPress}
          onmouseup={()=>setSpinner(false)}
        />
        {spinner && (
          <Spinner id="spinner" color="primary" type="grow"></Spinner>
        )}
      </div>
    </>
  );
}

export default Profile;

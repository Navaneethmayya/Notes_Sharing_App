import React from "react";
import { useState, useRef } from "react";
import "./Profile.css";
import { Spinner } from "reactstrap";
import ImageCropper from "./ImageCropper";
function Profile() {
  const [spinner, setSpinner] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const timerRef = React.useRef(null);
  const cancelledRef = useRef(true);

  const startPress = () => {
    cancelledRef.current = false;
    console.log("start press called");
    timerRef.current = setTimeout(() => {
      if (!cancelledRef.current) setSpinner(true);
    }, 1000);
  };

  const endPress = () => {
    cancelledRef.current = true;
    clearTimeout(timerRef.current);
    console.log("end press called");
    setSpinner(false);
    // Removed direct DOM manipulation; handle spinner appearance with state and CSS.
  };
  return (
    <>
      <div className="profile_holder">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="profile"
          className="profile_img"
          onMouseDown={startPress}
          onDoubleClick={endPress}
        />
        {spinner && (
          <div>
            <Spinner id="spinner" color="primary" type="grow"></Spinner>
            <ImageCropper
              trigger={
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    border: "2px solid #ccc",
                    overflow: "hidden",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {profileImg ? (
                    <img
                      src={profileImg}
                      alt="profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span style={{ color: "#888" }}>+</span>
                  )}
                </div>
              }
              onSave={setProfileImg}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;

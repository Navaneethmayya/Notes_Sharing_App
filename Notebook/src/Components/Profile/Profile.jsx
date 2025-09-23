import React, { useState, useRef } from "react";
import { Spinner } from "reactstrap";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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
  const [file, setfile] = useState(null);
  const timerRef = useRef(null);
  const inputRef = useRef(null);
  const [uploaded, setuploaded] = useState(false);

  const navigate = useNavigate();
  const startPress = () => {
    timerRef.current = setTimeout(() => {
      setSpinner(true);
      setuploaded(false);
      setfile(null);
    }, 1000);
  };

  const cancelPress = () => clearTimeout(timerRef.current);

  const handleDoubleClick = () => setSpinner(false);
  const handleOutsideClick = (e) => {
    if (!e.target.closest(".profile_container")) {
      setSpinner(false);
      if (file != null && !uploaded) {
        //
        const Formdata = new FormData();
        Formdata.append("file", file);
        Formdata.append("id", Math.random(1, 10));
        try {
          const res = axios.post(
            "http://localhost:5184/api/File/upload",

            Formdata
          );
          console.log(res);
          toast.success("uplodaed");
          setuploaded(true);
        } catch (error) {
          toast.error(error);
        }
      }
    }

    //////////////file/ multipart ////////////
    // FormData: multpart string id
    // const formData = new FormData();
    // formData.append('file',file);
    // try{
    //   const res=await axios.post("xyz",{
    //     formData,

    //   });
    //   // toast.success("Profile Uploaded successfully");
    // }
    // catch(error){
    //   console.log("error while uploading is",error);

    //   // toast.error("Failed to upload your photo");
    // }
    /////////////// multipart////////////
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setfile(file);
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
  }, [file, uploaded]);

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
/*create upload button
  appear only after handle mouse button
  onclnink button click upload then die out*/

export default Profile;

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

export default function ImageCropper({ trigger, onSave }) {
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const onCropComplete = useCallback((_, area) => setCroppedArea(area), []);

  const getCroppedImg = async () => {
    const img = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = croppedArea.width;
    canvas.height = croppedArea.height;
    ctx.drawImage(img, croppedArea.x, croppedArea.y, croppedArea.width, croppedArea.height, 0, 0, croppedArea.width, croppedArea.height);
    return new Promise((res) => canvas.toBlob((f) => res(URL.createObjectURL(f)), "image/jpeg"));
  };

  const handleSave = async () => {
    onSave(await getCroppedImg());
    setOpen(false);
  };

  return (
    <>
      <span onClick={() => document.getElementById("fileInput").click()}>{trigger}</span>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files.length) {
            setImageSrc(URL.createObjectURL(e.target.files[0]));
            setOpen(true);
          }
        }}
      />
      {open && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 300, height: 350, background: "#fff", borderRadius: 8, padding: 10 }}>
            <Cropper image={imageSrc} crop={crop} zoom={zoom} aspect={1} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={onCropComplete} />
            <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={(e) => setZoom(e.target.value)} />
            <div style={{ marginTop: 10, textAlign: "center" }}>
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function createImage(url) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = url;
  });
}

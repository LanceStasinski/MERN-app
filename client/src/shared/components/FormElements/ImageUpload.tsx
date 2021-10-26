import React, { useRef } from "react";

import Button from "./Button";
import imageUploadCSS from "./ImageUpload.module.css";
import inputCSS from "./Input.module.css";

const ImageUpload: React.FC<{ id: string; center?: boolean }> = (props) => {
  const filePickerRef = useRef<HTMLInputElement>(null);

  const pickedHandler = () => {

  }

  const pickImageHandler = () => {
    filePickerRef.current!.click()
  }
  return (
    <div className={inputCSS["form-control"]}>
      <input
        id={props.id}
        ref={filePickerRef}
        type="file"
        style={{ display: "none" }}
        accept=".jpg, .png, .jpeg"
        onChange={pickedHandler}
      />
      <div
        className={`${imageUploadCSS["image-upload"]} ${
          props.center && imageUploadCSS['center']
        }`}
      >
        <div className={imageUploadCSS['image-upload__preview']}>
          <img src="" alt='Preview'/>
        </div>
        <Button type='button' onClick={pickImageHandler}>Pick IMAGE</Button>
      </div>
    </div>
  );
};

export default ImageUpload;

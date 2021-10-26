import React, { useRef, useState, useEffect } from "react";

import Button from "./Button";
import imageUploadCSS from "./ImageUpload.module.css";
import inputCSS from "./Input.module.css";

const ImageUpload: React.FC<{
  id: string;
  center?: boolean;
  onInput: (id: string, value: File | string | undefined, isValid: boolean) => void;
  errorText?: string;
}> = (props) => {
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event: any) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current!.click();
  };
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
          props.center && imageUploadCSS["center"]
        }`}
      >
        <div className={imageUploadCSS["image-upload__preview"]}>
          {previewUrl && <img src={previewUrl as string} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          Pick IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;

import React, { useState } from "react";
import { VeryLargeProfileImage } from "../../../../../UtilityComponents/UtilityComponents";

const Image = ({ image, setImage }) => {

  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      if (event.target.files[0].size > 500_000) {
        setErrorMessage("File is too large")
      } else {
        reader.onload = (event) => {
          setImage(String(event?.target?.result));
        };
        reader.readAsDataURL(event.target.files[0]);
        setErrorMessage('')
      }
    }
  }

  return (
    <div className="image-selection-container">
      <h2>Select profile image</h2>
      <label className="file-upload-button blue-button-container">
        <input type="file" name="image" accept=".jpg, .jpeg, .png" onChange={e => handleImageChange(e)}></input>
        Select image
      </label>
      <p className="secondary-text">Max size 0.5mb</p>
      <p className="image-selection-error-message">
        {errorMessage}
      </p>
      <div className="image-container">
        <VeryLargeProfileImage image={image} />
      </div>
    </div>
  )
}

export default Image


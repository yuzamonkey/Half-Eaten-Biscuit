import React from "react";

const Image = ({image, setImage}) => {
  
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(String(event?.target?.result));
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  return (
    <div>
      <h3>Set image</h3>
      <input type="file" name="image" accept=".jpg, .jpeg, .png" onChange={e => handleImageChange(e)}></input>
      <img src={image} alt="" width={300} />
    </div>
  )
}

export default Image


import { useState } from "react"
import blankprofile from '../../../../../images/blankprofile.png'

const Image = () => {
  const [image, setImage] = useState(blankprofile)
  console.log("TYPE", typeof(image))
  
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
      <p className="image-name-text-something-foo-bar">{image}</p>
      <input type="file" name="image" accept=".jpg, .jpeg, .png" onChange={e => handleImageChange(e)}></input>
      <img src={image} alt="" id="img" className="img" width={300} />
    </div>
  )
}

export default Image


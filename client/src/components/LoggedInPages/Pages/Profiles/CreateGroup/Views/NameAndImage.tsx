import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_GROUP_NAMES } from "../../../../../../graphql/queries";
import { VeryLargeProfileImage } from "../../../../../UtilityComponents/UtilityComponents";

const NameAndImage = ({ groupName, setGroupName, image, setImage }) => {
  const [groupNames, setGroupNames] = useState<string[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')
  
  useQuery(ALL_GROUP_NAMES, {
    onCompleted: (data) => {
      console.log("DATA", data.allGroups)
      setGroupNames(data.allGroups.map(g => g.profile.name))
    }
  })

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

  const handleNameChange = (name) => {
    if (groupNames.includes(name)) {
      setErrorMessage(`${name} is already taken`)
    } else {
      setErrorMessage('')
    }
    setGroupName(name)
  }

  return (
    <div className="image-selection-container">

      <p className="image-selection-error-message">
        {errorMessage}
      </p>

      <h2 className="secondary-text">Group name</h2>

      <input
        className="group-name-input"
        value={groupName}
        maxLength={20}
        onChange={({target}) => handleNameChange(target.value)}>
      </input>
      <br />

      <h2 className="secondary-text">Select profile image</h2>
      <br />

      <label className="file-upload-button blue-button-container">
        <input type="file" name="image" accept=".jpg, .jpeg, .png" onChange={e => handleImageChange(e)}></input>
        Select image
      </label>

      <p className="secondary-text">Max size 0.5mb</p>

      <div className="image-container">
        <VeryLargeProfileImage image={image} />
      </div>
    </div>
  )
}

export default NameAndImage
import React from "react"

const CreateProfileInfo = ({ name }) => {
  return (
    <div className="create-profile-info-container">
      <p>
        Hey {name}, let's create your profile
      </p>
    </div>
  )
}

export default CreateProfileInfo
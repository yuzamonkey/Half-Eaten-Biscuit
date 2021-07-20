import React from "react"
import { useMutation } from "@apollo/client"

import { Button } from "../../../../../utils/UtilityComponents/UtilityComponents"
import { CREATE_USER_PROFILE } from "../../../../../graphql/mutations"

const Summary = ({ skills, about, image }) => {
  const [createUserProfile] = useMutation(CREATE_USER_PROFILE, {
    onError: (error) => {
      console.log("Error at create user profile mutation: \n", error)
    }
  })

  const handleSubmit = () => {
    console.log("SUBMIT CALLED")
    const skillIds = skills.map(s => s.id)
    createUserProfile({
      variables: {
        skills: skillIds,
        about: about,
        image: image
      }
    })
  }

  return (
    <div>
      <h3>Summary</h3>
      {skills.map(s => <div>{s.name}</div>)}
      {about}
      <img src={image} alt="" width={500} />
      <Button text="Submit" handleClick={handleSubmit} />
    </div>
  )
}

export default Summary
import React from "react"
import { useMutation } from "@apollo/client"

import { Button } from "../../../../UtilityComponents/UtilityComponents"
import { CREATE_USER_PROFILE } from "../../../../../graphql/mutations"

const Summary = ({ skills, about, image }) => {

  const [createUserProfile] = useMutation(CREATE_USER_PROFILE, {
    onError: (error) => {
      console.log("Error at create user profile mutation: \n", error)
    }
  })

  const handleSubmit = () => {
    const skillIds = skills.map(s => s.id)
    const response = createUserProfile({
      variables: {
        skills: skillIds,
        about: about,
        image: image
      }
    })
    console.log("RESPONSE", response)
    //window.location.assign('/')
  }

  return (
    <div>
      <h3>Summary</h3>
      {skills.map(s => <div key={s.id}>{s.name}</div>)}
      <br></br>
      {about}
      <img src={image} alt="" width={200} />
      <Button text="Submit" handleClick={handleSubmit} />
    </div>
  )
}

export default Summary
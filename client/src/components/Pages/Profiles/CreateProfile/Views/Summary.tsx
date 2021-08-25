import React, { useState } from "react"
import { useMutation, useQuery } from "@apollo/client"

import { Button, Loading } from "../../../../UtilityComponents/UtilityComponents"
import { CREATE_USER_PROFILE } from "../../../../../graphql/mutations"
import { MY_ID } from "../../../../../graphql/queries"

const Summary = ({ categories, about, image }) => {
  const myId = useQuery(MY_ID, { onCompleted: () => setRedirectAdress(`/profiles/${myId.data.me.id}`) })
  const [submitCompleted, setSubmitCompleted] = useState(false)
  const [redirectAdress, setRedirectAdress] = useState('')

  const [createUserProfile, { loading }] = useMutation(CREATE_USER_PROFILE, {
    onError: (error) => {
      console.log("Error at create user profile mutation: \n", error)
    }
  })

  const handleSubmit = async () => {
    const categoryIds = categories.map(s => s.id)
    const response = await createUserProfile({
      variables: {
        categories: categoryIds,
        about: about,
        image: image
      }
    })
    if (response.data.createUserProfile.about === about) {
      setSubmitCompleted(true)
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    !submitCompleted
      ?
      <div>
        <h3>Summary</h3>
        {categories.map(s => <div key={s.id}>{s.name}</div>)}
        <br></br>
        {about}
        <img src={image} alt="" width={200} />
        <Button text="Submit" handleClick={handleSubmit} />
      </div>
      :
      <div>
        <h1>Profile created succesfully</h1>
        <p>See it <a href={redirectAdress}>here</a></p>
      </div>
  )
}

export default Summary
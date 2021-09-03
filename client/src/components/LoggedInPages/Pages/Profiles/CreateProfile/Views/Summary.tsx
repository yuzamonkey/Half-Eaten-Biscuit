import React, { useState } from "react"
import { useMutation, useQuery } from "@apollo/client"

import { BlueButton, LargeProfileImage, Loading } from "../../../../../UtilityComponents/UtilityComponents"
import { CREATE_USER_PROFILE } from "../../../../../../graphql/mutations"
import { MY_ID } from "../../../../../../graphql/queries"
import { useHistory } from "react-router-dom"
import { categoriesWithParentsRemoved } from "../../../../../../utils/utilityFunctions"

const Summary = ({ name, categories, about, image }) => {
  const history = useHistory()
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
    return (
      <div className="summary-container">
        <Loading />
      </div>
    )
  }

  return (
    !submitCompleted
      ?
      <div className="summary-container">
        <h2>Summary</h2>
        {/* <br /> */}
        <LargeProfileImage image={image} />
        <h1>{name}</h1>
        {categoriesWithParentsRemoved(categories).map(s => <p key={s.id}>{s.profession}</p>)}
        {/* <br /> */}
        <div className="about-text-container">
          <p>{about}</p>
        </div>
        <div className="summary-component-button-container">
          <BlueButton text="Submit" handleClick={handleSubmit} />
        </div>
      </div>
      :
      <div className="summary-container">
        <h1>All done!</h1>
        <div className="summary-component-button-container">
          <BlueButton text="See your profile" handleClick={() => history.push(redirectAdress)} />
        </div>
      </div>
  )
}

export default Summary
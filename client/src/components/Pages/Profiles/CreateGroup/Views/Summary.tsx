import { useMutation } from "@apollo/client"

import { Button, Loading } from "../../../../UtilityComponents/UtilityComponents"
import { CREATE_GROUP } from "../../../../../graphql/mutations"
import { useState } from "react"

const Summary = ({ selectedUsers, groupName, image, categories, about }) => {
  const [submitCompleted, setSubmitCompleted] = useState(false)
  const [redirectAdress, setRedirectAdress] = useState('')

  const [createGroup, { loading }] = useMutation(CREATE_GROUP, {
    onError: (error) => {
      console.log("Error at create user profile mutation: \n", error)
    }
  })

  const handleSubmit = async () => {
    const categoryIds = categories.map(skill => skill.id)
    const userIds = selectedUsers.map(user => user.id)

    const response = await createGroup({
      variables: {
        name: groupName,
        users: userIds,
        about: about,
        image: image,
        categories: categoryIds
      }
    })
    if (response.data?.createGroup.kind === 'Group') {
      setSubmitCompleted(true)
      setRedirectAdress(`/profiles/${response.data.createGroup.id}`)
    } else {
      console.log("The name might be taken")
    }
    //window.location.assign('/')
  }

  if (loading) {
    return <Loading />
  }

  return (
    !submitCompleted
      ?
      <div>
        <h1>Summary</h1>
        USERS: {selectedUsers.map(u => <p>{u.username}</p>)}
        NAME: {groupName}
        <img src={image} alt="summaryimage"></img>
        {categories.map(skill => <p>{skill.name}</p>)}
        ABOUT: {about}
        <Button handleClick={handleSubmit} text='Submit' />
      </div>
      :
      <div>
        <h1>Group created succesfully</h1>
        <p>See it <a href={redirectAdress}>here</a></p>
      </div>
  )
}

export default Summary
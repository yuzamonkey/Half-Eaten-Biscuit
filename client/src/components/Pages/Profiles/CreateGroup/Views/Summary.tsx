import { useMutation } from "@apollo/client"

import { Button } from "../../../../UtilityComponents/UtilityComponents"
import { CREATE_GROUP } from "../../../../../graphql/mutations"

const Summary = ({ selectedUsers, groupName, image, skills, about }) => {
  
  const [createGroup] = useMutation(CREATE_GROUP, {
    onError: (error) => {
      console.log("Error at create user profile mutation: \n", error)
    }
  })

  const handleSubmit = () => {
    const skillIds = skills.map(skill => skill.id)
    const userIds = selectedUsers.map(user => user.id)

    createGroup({
      variables: {
        name: groupName,
        users: userIds,
        about: about,
        image: image,
        skills: skillIds
      }
    })
    window.location.assign('/')
  }

  return (
    <div>
      <h1>Summary</h1>
      USERS: {selectedUsers.map(u => <p>{u.username}</p>)}
      NAME: {groupName}
      <img src={image} alt="summaryimage"></img>
      {skills.map(skill => <p>{skill.name}</p>)}
      ABOUT: {about}
      <Button handleClick={handleSubmit} text='Submit' />
    </div>
  )
}

export default Summary
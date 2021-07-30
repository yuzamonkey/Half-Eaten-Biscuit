import { Button } from "../../../../UtilityComponents/UtilityComponents"

const Summary = ({ selectedUsers, groupName, image, skills }) => {
  
  const handleSubmit = () => {
    console.log("SUBMIT CALLED FOR GROUP CREATE")
  }

  return (
    <div>
      <h1>Summary</h1>
      USERS: {selectedUsers.map(u => <p>{u.username}</p>)}
      NAME: {groupName}
      <img src={image} alt="summaryimage"></img>
      {skills.map(skill => <p>{skill.name}</p>)}
      <Button handleClick={handleSubmit} text='Submit' />
    </div>
  )
}

export default Summary
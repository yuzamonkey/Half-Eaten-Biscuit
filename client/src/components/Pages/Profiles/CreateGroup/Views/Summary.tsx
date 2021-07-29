const Summary = ({ selectedUsers, groupName, image }) => {
  return (
    <div>
      <h1>Summary</h1>
      USERS: {selectedUsers.map(u => <p>{u.username}</p>)}
      NAME: {groupName}
      <img src={image} alt="summaryimage"></img>
    </div>
  )
}

export default Summary
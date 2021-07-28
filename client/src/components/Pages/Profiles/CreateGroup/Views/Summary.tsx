const Summary = ({ selectedUsers, groupName, image }) => {
  return (
    <div>
      <h3>Group summary component</h3>
      USERS: {selectedUsers.map(u => <p>{u.username}</p>)}
      NAME: {groupName}
      <img src={image} alt="summaryimage"></img>
    </div>
  )
}

export default Summary
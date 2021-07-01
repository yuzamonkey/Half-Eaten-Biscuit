import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_USERS } from '../../../graphql/queries'
import { Button } from '../../../utils/UtilityComponents/UtilityComponents'
import './NewGroup.css'

interface User {
  username: String
}

const NewGroup = () => {
  const [groupName, setGroupName] = useState("")
  const [selectedUsers, setSelectedUsers] = useState([{username: ""}])

  const result = useQuery(ALL_USERS)
  console.log("RESULT", result)

  if (result.loading) {
    return <div>Loading...</div>
  }

  const handleNewGroupSubmit = () => {
    console.log("NEW GROUP SUBMIT BUTTON PRESSED, users:", selectedUsers, "name:", groupName)
  }

  return (
    <div className="new-group-container">
      <h1>New group component</h1>
      <input value="Filter by name"></input>
      <input value={groupName} onChange={({target}) => setGroupName(target.value)}></input>
      <div className="selected-users">
        <h3>Selected users</h3>
        {selectedUsers.map(u => {
          return (
            <div
              className="selected-user"
              onClick={() => setSelectedUsers(selectedUsers.filter(user => user.username !== u.username))}>
              <p>{u.username}</p>
            </div>
          )
        })}
      </div>
      <div className="all-users-container">
        {result.data.allUsers.map(u => {
          return (
            selectedUsers.find(user => user.username === u.username)
              ?
              <div
                className="user-container selected"
                onClick={() => setSelectedUsers(selectedUsers.concat(u))}>
                <p>{u.username}</p>
              </div>
              :
              <div
                className="user-container"
                onClick={() => setSelectedUsers(selectedUsers.concat(u))}>
                <p>{u.username}</p>
              </div>
          )

        })}
      </div>



      <Button text="Create group" handleClick={handleNewGroupSubmit} />
    </div>
  )
}

export default NewGroup;
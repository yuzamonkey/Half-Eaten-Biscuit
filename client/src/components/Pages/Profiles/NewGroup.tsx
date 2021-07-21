import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import { ALL_USERS, ME } from '../../../graphql/queries'
import { Button } from '../../UtilityComponents/UtilityComponents'
import './NewGroup.css'
import { CREATE_GROUP } from '../../../graphql/mutations'

interface User {
  id: String
  username: String
}

const NewGroup = () => {
  const [groupName, setGroupName] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const allUsersResult = useQuery(ALL_USERS)
  const meResult = useQuery(ME)
  const [createGroup] = useMutation(CREATE_GROUP, {
    onError: (error) => {
      console.log("Error at create group mutation: \n", error)
    }
  })

  console.log("ME REUSLT", meResult)


  if (allUsersResult.loading || meResult.loading) {
    return <div>Loading...</div>
  }

  const handleNewGroupSubmit = () => {
    console.log("NEW GROUP SUBMIT BUTTON PRESSED, users:", selectedUsers, "name:", groupName)
    const usersIds = selectedUsers.map(u => u.id)
    createGroup({
      variables: {
        name: groupName,
        users: usersIds
      }
    })
    setSelectedUsers([])
    setGroupName("")

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
        {allUsersResult.data.allUsers.map(u => {
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
import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_USERS, MY_ID } from '../../../../../graphql/queries'
import { Loading, SmallProfileCard } from '../../../../UtilityComponents/UtilityComponents'
import '../CreateGroupForm.css'

interface User {
  id: String
  username: String
}

const UserSelection = ({ selectedUsers, setSelectedUsers }) => {
  const allUsersResult = useQuery(ALL_USERS)
  const myIdResult = useQuery(MY_ID)

  useEffect(() => {
    if (myIdResult.data && allUsersResult.data) {
      const meObject = allUsersResult.data.allUsers.find((user: User) => user.id === myIdResult.data.me.id)
      if (!selectedUsers.includes(meObject)) {
        setSelectedUsers(selectedUsers.concat(meObject))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myIdResult.data, allUsersResult.data])

  if (allUsersResult.loading || myIdResult.loading) {
    return <Loading />
  }

  const handleRemoveFromSelectedUsers = (u) => {
    if (u.id !== myIdResult.data.me.id) {
      setSelectedUsers(selectedUsers.filter(user => user.username !== u.username))
    }
  }

  return (
    <div className="new-group-container">
      <h1>Create group</h1>
      <input value="Filter by name" onChange={() => { }}></input>

      <div className="selected-users-container">
        <h3>Selected users</h3>
        {selectedUsers.map(u => {
          return (
            <div
              className="selected-user"
              onClick={() => handleRemoveFromSelectedUsers(u)}>
              <SmallProfileCard id={u.id} image={u.profile.image} name={u.username} />
              <div className="small-profile-card-overlay selected-user-overlay">Remove</div>
            </div>
          )
        })}
      </div>
      <div className="all-users-container">
        {allUsersResult.data.allUsers.map(u => {
          return (
            <div className="all-user-container" onClick={() => setSelectedUsers(selectedUsers.concat(u))}>
              {!selectedUsers.find(user => user.username === u.username) &&
                <SmallProfileCard id={u.id} image={u.profile.image} name={u.username} />}
              <div className="small-profile-card-overlay all-user-overlay">Add</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default UserSelection


/*
import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import { ALL_USERS, MY_ID } from '../../../../graphql/queries'
import { CREATE_GROUP } from '../../../../graphql/mutations'
import { Button } from '../../../UtilityComponents/UtilityComponents'
import './CreateGroupForm.css'

interface User {
  id: String
  username: String
}

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('Group name')
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const allUsersResult = useQuery(ALL_USERS)
  const myIdResult = useQuery(MY_ID)

  const [createGroup] = useMutation(CREATE_GROUP, {
    onError: (error) => {
      console.log("Error at create group mutation: \n", error)
    }
  })

  useEffect(() => {
    if (myIdResult.data && allUsersResult.data) {
      const meObject = allUsersResult.data.allUsers.find((user: User) => user.id === myIdResult.data.me.id)
      if (!selectedUsers.includes(meObject)) {
        setSelectedUsers(selectedUsers.concat(meObject))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myIdResult.data, allUsersResult.data])

  if (allUsersResult.loading || myIdResult.loading) {
    return <div>Loading...</div>
  }

  const handleRemoveFromSelectedUsers = (u) => {
    if (u.id !== myIdResult.data.me.id) {
      setSelectedUsers(selectedUsers.filter(user => user.username !== u.username))
    }
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
      <h1>Create group</h1>
      <input value="Filter by name" onChange={() => { }}></input>
      <input value={groupName} onChange={({ target }) => setGroupName(target.value)}></input>

      <div className="selected-users">
        <h3>Selected users</h3>
        {selectedUsers.map(u => {
          return (
            <div
              className="selected-user"
              onClick={() => handleRemoveFromSelectedUsers(u)}>
              <p>{u.username}</p>
            </div>
          )
        })}
      </div>
      <div className="all-users-container">
        {allUsersResult.data.allUsers.map(u => {
          return (
            !selectedUsers.find(user => user.username === u.username) &&
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

export default CreateGroup;

*/
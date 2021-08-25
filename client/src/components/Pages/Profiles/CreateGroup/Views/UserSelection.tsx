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
      if (!selectedUsers.map(u => u.id).includes(myIdResult.data.me.id)) {
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
      <h1>Select members</h1>

      <div className="selected-users-container">
        <h3>Selected</h3>
        {selectedUsers.map(u => {
          return (
            <div
              className="selected-user"
              onClick={() => handleRemoveFromSelectedUsers(u)}>
              <SmallProfileCard id={u.id} image={u.profile.image} name={u.profile.name} />
              <div className="small-profile-card-overlay selected-user-overlay">Remove</div>
            </div>
          )
        })}
      </div>
      <div className="all-users-container">
        {allUsersResult.data.allUsers.map(u => {
          return (
            <div className="all-user-container" onClick={() => setSelectedUsers(selectedUsers.concat(u))}>
              {!selectedUsers.find(user => user.username === u.profile.name) &&
                <SmallProfileCard id={u.id} image={u.profile.image} name={u.profile.name} />}
              <div className="small-profile-card-overlay all-user-overlay">Add</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default UserSelection

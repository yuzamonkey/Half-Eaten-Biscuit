import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_USERS, MY_ID } from '../../../../../../graphql/queries'
import { Loading, MediumProfileCard, Searchbar, SmallProfileCard } from '../../../../../UtilityComponents/UtilityComponents'
import '../CreateGroupForm.css'
import { reverse } from '../../../../../../utils/utilityFunctions'

interface User {
  id: String
  username: String
}

const UserSelection = ({ selectedUsers, setSelectedUsers }) => {
  const allUsersResult = useQuery(ALL_USERS)
  const myIdResult = useQuery(MY_ID)
  const [searchInput, setSearchInput] = useState('')

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
    <div className="user-selection-container">
      <h1>Select members</h1>

      <div className="selected-users-container">
        <h3 className="secondary-text">Selected</h3>
        {reverse(selectedUsers).map(u => {
          return (
            <div
              className="selected-user"
              onClick={() => handleRemoveFromSelectedUsers(u)}>
              <SmallProfileCard image={u.profile.image} name={u.profile.name} />
              {u.id !== myIdResult.data.me.id &&
                <div className="small-profile-card-overlay selected-user-overlay">Remove</div>
              }
            </div>
          )
        })}
      </div>
      <div className="all-users-searchbar-container">
        <Searchbar input={searchInput} setInput={setSearchInput} />
      </div>
      <div className="all-users-container">
        {allUsersResult.data.allUsers.map(u => {
          const name = u.profile.name
          if (name.toLowerCase().includes(searchInput.toLowerCase()) && u.id !== myIdResult.data.me.id) {
            return (
              <div className="all-user-container" onClick={() => setSelectedUsers(selectedUsers.concat(u))}>
                {!selectedUsers.find(user => user.profile.name === u.profile.name) &&
                  <MediumProfileCard image={u.profile.image} name={u.profile.name} />}
                <div className="small-profile-card-overlay all-user-overlay">Add</div>
              </div>
            )
          } return null
        })}
      </div>
    </div>
  )
}

export default UserSelection

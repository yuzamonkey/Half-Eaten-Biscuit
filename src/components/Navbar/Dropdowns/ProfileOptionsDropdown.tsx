import React from 'react'
import { useHistory } from 'react-router-dom'

const ProfileOptionsDropdown = ({ logout }: any) => {
  const history = useHistory()

  const handleLogout = () => {
    logout()
    history.push('/')
  }

  return (
    <div>
      <h3>Profile drop options</h3>
      <button onClick={handleLogout}>Log out</button>
    </div>
  )
}

export default ProfileOptionsDropdown
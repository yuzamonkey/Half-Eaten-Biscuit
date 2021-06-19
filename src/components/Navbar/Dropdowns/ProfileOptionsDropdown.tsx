import React from 'react'
import { useApolloClient } from "@apollo/client";

const ProfileOptionsDropdown = () => {
  const client = useApolloClient()

  const handleLogout = async () => {
    const result = await client.resetStore()
    console.log("LOGOUT RESULT", result)
    localStorage.clear()
    //window.location.assign('/')
  }

  return (
    <div>
      <h3>Profile drop options</h3>
      <button onClick={handleLogout}>Log out</button>
    </div>
  )
}

export default ProfileOptionsDropdown
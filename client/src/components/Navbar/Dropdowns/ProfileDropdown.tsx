import React from 'react'
import { useApolloClient, useQuery, useLazyQuery } from "@apollo/client";
import { useHistory } from 'react-router';

import { ALL_USERS, ME } from '../../../graphql/queries';
import './Dropdown.css'

const ProfileDropdown = ({ show, setShow }: any) => {

  const client = useApolloClient()
  const result = useQuery(ME)
  const [findGroup, { loading, data }] = useLazyQuery(ALL_USERS)
  console.log(loading, data)

  const history = useHistory()

  if (!show) {
    return null
  }

  if (result.loading) return <div className="dropdown">Loading...</div>
  console.log(result.data.me)
  const handleLogout = async () => {
    await client.resetStore()
    localStorage.clear()
    sessionStorage.clear()
    window.location.assign('/')
  }

  const handleProfileClick = () => {
    history.push(`/profile/${result.data.me.id}`)
  }

  const handleSettingsClick = () => {
    history.push('/settings')
  }

  const handleNewGroupClick = () => {
    console.log("NEW GROUP CLICKED")
  }

  const handleProfileChange = async (groupId) => {
    console.log("SWITCH PROFILE TO ", groupId)
    //sessionStorage.setItem('PROFILE', groupId)
    findGroup()
    console.log(loading, data)
  }

  return (
    <div className="dropdown">
      <div className="dropdown-profile" onClick={handleProfileClick}>
        <div>
          <img src="https://content.thriveglobal.com/wp-content/uploads/2018/01/Happy_guy.jpg" alt="musician" className="profile-image"></img>
        </div>
        <h3 className="profile-name">{result.data.me.username}</h3>
        <p className="secondary-text">Show profile</p>
      </div>
      <div className="dropdown-link" onClick={handleNewGroupClick}><b>My groups +</b></div>
      {result.data.me.groups.map(group => <div className="dropdown-link" onClick={() => handleProfileChange(group.id)}>{group.name}</div>)}
      <div className="dropdown-link" onClick={handleSettingsClick}>Settings</div>
      <div className="dropdown-link" onClick={handleLogout} >Log out</div>
    </div>
  )
}

export default ProfileDropdown
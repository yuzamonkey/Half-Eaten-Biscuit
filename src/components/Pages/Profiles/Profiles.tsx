import React from 'react';
import { useQuery } from '@apollo/client';

import { ALL_USERS } from '../../../queries';
import './Profiles.css'
import { useHistory } from 'react-router-dom';

const Profiles = () => {
  const result = useQuery(ALL_USERS)
  const history = useHistory()

  if (result.loading) {
    return <div>loading...</div>
  }

  console.log("PROFILES RESULT", result)
  return (
    <div>
      <h1>Profiles</h1>
      <div className="profiles-container">
        {result.data.allUsers.map((u: any) => {
          const profileUrl = `/profile/${u.id}`
          return (
            <div className="profile-container">
              <div className="upper-container">
                <div className="profile-image-container">
                  <div className="profile-image">
                    <img src="https://content.thriveglobal.com/wp-content/uploads/2018/01/Happy_guy.jpg" alt="musician" className="profile-image"></img>
                  </div>
                </div>
              </div>
              <div className="lower-container">
                <div className="name-container">
                  <h3 className="profile-name">{u.username}</h3>
                  <p>violinist, saxophonist</p>
                </div>
                <div className="profiles-buttons-container">
                  <button className="profiles-button to-profile-button" onClick={() => history.push(profileUrl)}>To profile</button>
                  <button className="profiles-button contact-button">Contact {u.username}</button>
                </div>
              </div>
            </div>
          )
        }
        )}
      </div>
    </div>
  )
}


export default Profiles
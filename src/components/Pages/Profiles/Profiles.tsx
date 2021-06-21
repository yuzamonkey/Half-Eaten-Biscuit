import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import './Profiles.css'
import { ALL_USERS, MY_ID } from '../../../graphql/queries';
import { NEW_CONVERSATION } from '../../../graphql/mutations';

const Profiles = () => {
  const allUsersResult = useQuery(ALL_USERS)
  const myIdResult = useQuery(MY_ID)
  const [newConversation] = useMutation(NEW_CONVERSATION)
  const history = useHistory()

  if (allUsersResult.loading || myIdResult.loading) {
    return <div>loading...</div>
  }

  const handleContactButtonPress = async (receiverId: any) => {
    console.log("CONTACT BUTTON PRESSED FOR", receiverId)
    //check for users conversations where only user is the receiver
    const result = await newConversation({ variables: { receiverId } })
    const newConversationId = result.data.createConversation.id
    history.push(`/messages/${newConversationId}`)
  }

  return (
    <div>
      <h1>Profiles</h1>
      <div className="profiles-container">
        {allUsersResult.data.allUsers.map((u: any) => {
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
                  {u.id !== myIdResult.data.me.id
                    ? <button className="profiles-button profiles-contact-button" onClick={() => handleContactButtonPress(u.id)}>Contact {u.username}</button>
                    : <button className="profiles-button disabled-button" disabled>Contact {u.username}</button>
                  }
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
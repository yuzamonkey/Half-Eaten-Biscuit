import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import './Profiles.css'
import { ALL_USERS, MY_ID } from '../../../graphql/queries';
import { NEW_CONVERSATION } from '../../../graphql/mutations';
import { Button } from '../../../utils/UtilityComponents/UtilityComponents';

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
      <b>Filters:</b> name <input></input>, group or individual, instrument
      
      <div className="profiles-container">
        {allUsersResult.data.allUsers.map((u: any) => {
          const profileUrl = `/profiles/${u.id}`
          return (
            <div className="profile-container" key={u.id}>
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
                  <Button text='To profile' handleClick={() => history.push(profileUrl)} />
                  {u.id !== myIdResult.data.me.id
                    ? <Button text='Contact' handleClick={() => handleContactButtonPress(u.id)} />
                    : null
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
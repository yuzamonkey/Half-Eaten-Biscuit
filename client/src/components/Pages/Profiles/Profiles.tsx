import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import './Profiles.css'
import { ALL_USERS, MY_ID, ALL_USER_PROFILES } from '../../../graphql/queries';
import { NEW_CONVERSATION } from '../../../graphql/mutations';
import { Button } from '../../../utils/UtilityComponents/UtilityComponents';

const Profiles = () => {
  const allUsersResult = useQuery(ALL_USER_PROFILES)
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
        {allUsersResult.data?.allUserProfiles.map((profile: any) => {
          console.log("PROFILE", profile)
          const profileUrl = `/profiles/${profile.user.id}`
          return (
            <div className="profile-container" key={profile.id}>
              <div className="upper-container">
                <div className="profile-image-container">
                  <div className="profile-image">
                    <img src={profile.image} alt="profileimg" className="profile-image"></img>
                  </div>
                </div>
              </div>
              <div className="lower-container">
                <div className="name-container">
                  <h3 className="profile-name">{profile.user.username}</h3>
                  {profile.skills.map(skill => <p>{skill.name}</p>)}
                </div>
                <div className="profiles-buttons-container">
                  <Button text='To profile' handleClick={() => history.push(profileUrl)} />
                  {profile.user.id !== myIdResult.data.me.id
                    ? <Button text='Contact' handleClick={() => handleContactButtonPress(profile.id)} />
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
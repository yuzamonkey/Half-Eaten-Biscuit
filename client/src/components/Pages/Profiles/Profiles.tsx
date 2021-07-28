import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import './Profiles.css'
import { MY_ID, ALL_USER_PROFILES, ALL_USERS_AND_GROUPS } from '../../../graphql/queries';
import { NEW_CONVERSATION } from '../../../graphql/mutations';
import { Button, Searchbar } from '../../UtilityComponents/UtilityComponents';

const Profiles = () => {
  const allUsersResult = useQuery(ALL_USER_PROFILES)
  const myIdResult = useQuery(MY_ID)
  const allUsersAndGroups = useQuery(ALL_USERS_AND_GROUPS)
  const [newConversation] = useMutation(NEW_CONVERSATION)
  const history = useHistory()

  if (allUsersResult.loading || myIdResult.loading || allUsersAndGroups.loading) {
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
    <div className="profiles-page-container">
      <div className="profiles-title-and-searchbar-container">
        <h1>Profiles</h1>
        <div className="profiles-searchbar-container">
          <Searchbar />
        </div>
      </div>

      <div className="profiles-container">
        {allUsersAndGroups.data.allUsersAndGroups.map((item: any) => {
          const profileUrl = `/profiles/${item.id}`

          return (
            <div className="profile-container" key={item.id}>
              <div className="upper-container">
                <div className="profile-image-container">
                  <div className="profile image">
                    <img src={item.profile.image} alt="profileimg" className="profile-image"></img>
                  </div>
                </div>
              </div>
              <div className="lower-container">
                <div className="name-container">
                  <h3 className="profile-name">{item.username || item.profile.name}</h3>
                  {item.kind === 'User' && item.profile.skills.map(skill => <p key={skill.id}>{skill.name}</p>)}
                </div>
                <div className="profiles-buttons-container">
                  <Button text='To profile' handleClick={() => history.push(profileUrl)} />
                  {item.id !== myIdResult.data.me.id
                    ? <Button text='Contact' handleClick={() => handleContactButtonPress(item.id)} />
                    : null
                  }
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}


export default Profiles
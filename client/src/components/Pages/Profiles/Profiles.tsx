import React, { useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import './Profiles.css'
import { MY_ID, ALL_USERS_AND_GROUPS } from '../../../graphql/queries';
import { NEW_CONVERSATION } from '../../../graphql/mutations';
import { LargeProfileCard, Loading, Searchbar } from '../../UtilityComponents/UtilityComponents';
import { UserContext } from '../../UtilityComponents/UserContext';

const Profiles = () => {
  const userContext = useContext(UserContext)
  const myIdResult = useQuery(MY_ID)
  const allUsersAndGroups = useQuery(ALL_USERS_AND_GROUPS)
  const [newConversation] = useMutation(NEW_CONVERSATION)
  const history = useHistory()

  if (myIdResult.loading || allUsersAndGroups.loading) {
    return <Loading />
  }

  const handleContactButtonPress = async (receiverId: any) => {
    console.log("CONTACT BUTTON PRESSED FOR", receiverId)
    //check for users conversations where only user is the receiver
    const result = await newConversation({
      variables: {
        senderId: userContext.sessionId,
        receiverId: receiverId
      }
    })
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
              <LargeProfileCard
                id={item.id}
                image={item.profile.image}
                name={item.username || item.profile.name}
                skills={item.profile.skills || item.profile.groupTypes}
                url={profileUrl}
                contactFunction={() => handleContactButtonPress(item.id)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}


export default Profiles
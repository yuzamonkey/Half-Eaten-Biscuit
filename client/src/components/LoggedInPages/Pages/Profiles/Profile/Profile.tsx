import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import './Profile.css'

import { FIND_USER_OR_GROUP } from '../../../../../graphql/queries';
import { VeryLargeProfileImage, Loading, SmallProfileCard, ContactButton, DisabledContactButton } from '../../../../UtilityComponents/UtilityComponents';
import { categoriesWithParentsRemoved, textAsArray } from '../../../../../utils/utilityFunctions';
import { UserContext } from '../../../../UtilityComponents/UserContext';
import { NEW_CONVERSATION } from '../../../../../graphql/mutations';

const Profile = () => {
  const userContext = useContext(UserContext)
  const history = useHistory()
  const { id }: any = useParams();
  const result = useQuery(FIND_USER_OR_GROUP, {
    variables: { id }
  })
  const [newConversation] = useMutation(NEW_CONVERSATION)

  if (result.loading) {
    return <Loading />
  }

  if (!result.data) {
    return <h1>Profile not found...</h1>
  }

  const handleContactClick = async (receiverId: any) => {
    const result = await newConversation({
      variables: {
        senderId: userContext.sessionId,
        receiverId: receiverId
      }
    })
    const returnedId = result.data.createConversation.id
    history.push(`/messages/${returnedId}`)
  }

  const userOrGroup = result.data.findUserOrGroup
  const categories = categoriesWithParentsRemoved(userOrGroup.profile.categories)

  return (
    <div className="profile-container">

      <div className="image-name-and-categories-container">
        <VeryLargeProfileImage image={userOrGroup.profile.image} />
        <h1>{userOrGroup.profile.name}</h1>
        {categories.map(c => <p>{c.profession || c.name}</p>)}
      </div>

      <div className="profile-content-container">

        <div className="users-or-groups-container">
          {userOrGroup.kind === 'User' &&
            <div>
              <h1 className="secondary-text">Groups</h1>
              {userOrGroup.groups.map(g =>
                <div className="small-card-container" onClick={() => history.push(`/profiles/${g.id}`)}>
                  <SmallProfileCard name={g.profile.name} image={g.profile.image} />
                </div>
              )}
            </div>}
          {userOrGroup.kind === 'Group' &&
            <div>
              <h1 className="secondary-text">Members</h1>
              {userOrGroup.users.map(u =>
                <div className="small-card-container" onClick={() => history.push(`/profiles/${u.id}`)}>
                  <SmallProfileCard name={u.profile.name} image={u.profile.image} />
                </div>
              )}
            </div>}
        </div>
        
        <div className="about-container">
          <h1 className="secondary-text">About</h1>
          <div className="about-text">
            {textAsArray(userOrGroup.profile.about).map(t => <p>{t}<br /></p>)}
          </div>
        </div>
        <div className="contact-container">
          <h1 className="secondary-text">&nbsp;</h1>
          <div className="contact-button-container">
          {userOrGroup.id !== userContext.sessionId 
          ?
            <ContactButton handleClick={() => handleContactClick(userOrGroup.id)} />
          : <DisabledContactButton  />
          }
          </div>
        </div>
      </div>

    </div>
  )
}

export default Profile;
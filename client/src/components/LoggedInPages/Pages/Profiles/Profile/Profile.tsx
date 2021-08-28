import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import './Profile.css'
import { FIND_USER_OR_GROUP } from '../../../../../graphql/queries';
import { VeryLargeProfileImage, Loading, SmallProfileCard, ContactButton } from '../../../../UtilityComponents/UtilityComponents';
import { categoriesWithParentsRemoved } from '../../../../../utils/utilityFunctions';

const Profile = () => {
  const history = useHistory()
  const { id }: any = useParams();
  const result = useQuery(FIND_USER_OR_GROUP, {
    variables: { id }
  })

  if (result.loading) {
    return <Loading />
  }

  if (!result.data) {
    return <h1>Profile not found...</h1>
  }

  const userOrGroup = result.data.findUserOrGroup
  console.log("THE DUDE", userOrGroup)

  const c = userOrGroup.profile.categories
  console.log("C", c)
  const removedParents = categoriesWithParentsRemoved(c)
  console.log("REMOVED", removedParents)

  return (
    <div className="profile-container">
      <div className="image-name-and-categories-container">
        <VeryLargeProfileImage image={userOrGroup.profile.image} />
        <h1>{userOrGroup.profile.name}</h1>
        {removedParents.map(c => <div>{c.profession || c.name}</div>)}
      </div>
      <div className="profile-content-container">
        <div className="users-or-groups-container">
          {userOrGroup.kind === 'User' &&
            <div>
              {userOrGroup.groups.map(g => <div className="small-card-container" onClick={() => history.push(`/profiles/${g.id}`)}><SmallProfileCard name={g.profile.name} image={g.profile.image} /></div>)}
            </div>}
          {userOrGroup.kind === 'Group' &&
            <div>
              {userOrGroup.users.map(u => <div className="small-card-container" onClick={() => history.push(`/profiles/${u.id}`)}><SmallProfileCard name={u.profile.name} image={u.profile.image} /></div>)}
            </div>}
        </div>
        <div className="about-container">
          {userOrGroup.profile.about}
        </div>
        <div className="contact-container">
          <ContactButton />
        </div>
      </div>
    </div>
  )
}

export default Profile;
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import './Profile.css'
import { FIND_USER_OR_GROUP } from '../../../../graphql/queries';
import { VeryLargeProfileImage, Loading } from '../../../UtilityComponents/UtilityComponents';

const Profile = () => {
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

  return (
    <div className="profile-container">
      <div>
        <VeryLargeProfileImage image={userOrGroup.profile.image}/>
        <h1>{userOrGroup.profile.name}</h1>
        {userOrGroup.profile.about}
      </div>
    </div>
  )
}

export default Profile;
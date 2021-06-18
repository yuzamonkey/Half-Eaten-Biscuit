import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FIND_USER } from '../../../../queries';

const Profile = () => {
  const { id }: any = useParams();
  const result = useQuery(FIND_USER, {
    variables: { id }
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  console.log(result)
  return (
  <div>
    <h3>Profile</h3>
    {result.data.findUser.username}
  </div>
  )
}

export default Profile;
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FIND_USER } from '../../../../graphql/queries';

const Profile = () => {
  const { id }: any = useParams();
  const result = useQuery(FIND_USER, {
    variables: { id }
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      {result.data
        ? (
          <div>
            <h3>{result.data.findUser.username}'s profile</h3>
            {result.data.findUser.profile.about}
            <img src={result.data.findUser.profile.image} alt="" id="img" className="img" width={300} />
          </div>
        )
        : (
          <div><b>No profile for dis guy:</b> {id}</div>
        )
      }

    </div>
  )
}

export default Profile;
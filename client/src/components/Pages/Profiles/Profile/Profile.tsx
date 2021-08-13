import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FIND_USER_OR_GROUP } from '../../../../graphql/queries';
import { Loading } from '../../../UtilityComponents/UtilityComponents';

const Profile = () => {
  const { id }: any = useParams();
  const result = useQuery(FIND_USER_OR_GROUP, {
    variables: { id }
  })

  if (result.loading) {
    return <Loading />
  }

  console.log("USER/GROUP RESULT", result.data)

  if (!result.data) {
    return <h1>Profile not found...</h1>
  }

  const kind = result.data.findUserOrGroup.kind

  if (kind === 'User') {
    return (
      <div>
        {result.data
          ? (
            <div>
              <h3>{result.data.findUserOrGroup.username}'s profile</h3>
              {result.data.findUserOrGroup.profile.about}
              <img src={result.data.findUserOrGroup.profile.image} alt="" id="img" className="img" width={300} />
            </div>
          )
          : (
            <div><b>No profile for dis guy:</b> {id}</div>
          )
        }
      </div>
    )
  } else if (kind === 'Group') {
    return (
      <div>
        {result.data
          ? (<div>
            <b>{result.data.findUserOrGroup.profile.name}</b>
            <img src={result.data.findUserOrGroup.profile.image} alt="" id="img" className="img" width={300} />
            {result.data.findUserOrGroup.users.map(user => <div key={user.id}>{user.username}</div>)}
            </div>)
          : (<div>No group profile</div>)}
      </div>
    )
  } else {
    return (
      <h1>Not found</h1>
    )
  }
}

export default Profile;
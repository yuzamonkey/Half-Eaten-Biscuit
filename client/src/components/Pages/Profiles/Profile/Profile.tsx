import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FIND_USER_OR_GROUP } from '../../../../graphql/queries';

const Profile = () => {
  const { id }: any = useParams();
  const result = useQuery(FIND_USER_OR_GROUP, {
    variables: { id }
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  console.log("USER/GROUP RESULT", result.data)

  console.log(result.data.findUserOrGroup.__typename)
  const type = result.data.findUserOrGroup.__typename

  if (type === 'User') {
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
  } else {
    return (
      <div>
        {result.data
          ? (<div>
            {result.data.findUserOrGroup.profile.name}
            <img src={result.data.findUserOrGroup.profile.image} alt="" id="img" className="img" width={300} />
            </div>)
          : (<div></div>)}
      </div>
    )
  }
}

export default Profile;
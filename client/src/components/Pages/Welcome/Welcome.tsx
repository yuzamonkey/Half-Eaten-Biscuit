import React from 'react'
import { useQuery } from '@apollo/client'
import { useHistory } from 'react-router'

import { ME } from '../../../graphql/queries'
//import { SIGN_IN_TOKEN } from '../../../utils/constants'

const Welcome = () => {

 const result = useQuery(ME)
 const history = useHistory()

 //const token = localStorage.getItem(SIGN_IN_TOKEN)

  if (result.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Welcome <i>{result.data.me.username}</i></h1>
      {!result.data.me.profile.isEditedByUser && <div onClick={() => history.push('/createprofile')}>Create your profile</div>}
    </div>
  )
}

export default Welcome
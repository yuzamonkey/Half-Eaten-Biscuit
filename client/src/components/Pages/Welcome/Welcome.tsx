import React from 'react'
import { useQuery } from '@apollo/client'

import { ME } from '../../../graphql/queries'
import { SIGN_IN_TOKEN } from '../../../utils/constants'

const Welcome = () => {

 const result = useQuery(ME)
 const token = localStorage.getItem(SIGN_IN_TOKEN)

  if (result.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Welcome <i>{result.data.me.username}</i></h1>
      <p><b>You token is: </b>{token}</p>
    </div>
  )
}

export default Welcome
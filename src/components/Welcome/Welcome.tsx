import React from 'react'
import { useQuery } from '@apollo/client'

import { ME } from '../../queries'

const Welcome = ({logout}: any) => {

  const result = useQuery(ME)

  if (result.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Welcome <i>{result.data.me.username}</i></h1>
      <button onClick={() => logout()}>Log out</button>
    </div>
  )
}

export default Welcome
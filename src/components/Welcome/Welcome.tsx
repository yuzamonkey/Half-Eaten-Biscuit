import React from 'react'
import { useQuery } from '@apollo/client'

import { ME } from '../../queries'

const Welcome = () => {

  const result = useQuery(ME)

  if (result.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Welcome <i>{result.data.me.username}</i></h1>
    </div>
  )
}

export default Welcome
import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useHistory } from 'react-router'

import { FIND_USER_OR_GROUP, ME } from '../../../graphql/queries'
import { SESSION_TOKEN } from '../../../utils/constants'
import './Welcome.css'

const Welcome = () => {
  const result = useQuery(ME)
  const userOrGroup = useQuery(FIND_USER_OR_GROUP, { variables: { id: sessionStorage.getItem(SESSION_TOKEN) } })
  const history = useHistory()

  useEffect(() => {
    if (result.data) {
      const sessionToken = sessionStorage.getItem(SESSION_TOKEN)
      if (!sessionToken) {
        sessionStorage.setItem(SESSION_TOKEN, result.data.me.id)
      }
    }
  }, [result.data])

  if (result.loading || userOrGroup.loading) {
    return <div>Loading...</div>
  }
  console.log("UOG", userOrGroup.data.findUserOrGroup.__typename)

  const getTitleByTime = () => {
    const currentHour = new Date().getHours()
    if (currentHour > 4 && currentHour <= 11) {
      return 'Good morning'
    }
    else if (currentHour > 11 && currentHour <= 18) {
      return 'Good day'
    }
    else if (currentHour > 18 && currentHour <= 22) {
      return 'Good evening'
    } else {
      return 'Welcome'
    }
  }

  return (
    <div className="welcome-page-container">
      <h1 className="welcome-page-title">{getTitleByTime()}, <i>{result.data.me.username}</i></h1>
      {!result.data.me.profile.isEditedByUser &&
        <div className="info" onClick={() => history.push('/createprofile')}><b>⚠ Create your profile</b></div>}
      {userOrGroup.data.findUserOrGroup.__typename === 'Group' && 
      <div>You are using group profile for <i>{userOrGroup.data.findUserOrGroup.profile.name}</i></div>}
    </div>
  )
}

export default Welcome
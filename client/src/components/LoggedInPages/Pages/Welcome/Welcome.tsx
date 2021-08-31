import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { useHistory } from 'react-router'

import './Welcome.css'

import { FIND_USER_OR_GROUP, ME } from '../../../../graphql/queries'
import { UserContext } from '../../../UtilityComponents/UserContext'
import { Loading } from '../../../UtilityComponents/UtilityComponents'

const Welcome = () => {
  const userContext = useContext(UserContext)
  const meResult = useQuery(ME)
  const userOrGroup = useQuery(FIND_USER_OR_GROUP, { variables: { id: userContext.sessionId} })
  const history = useHistory()

  if (meResult.loading || userOrGroup.loading) {
    return <Loading />
  }

  const getTitleByTime = () => {
    const currentHour = new Date().getHours()
    if (currentHour > 4 && currentHour <= 11) {
      return 'Good morning'
    }
    else if (currentHour > 11 && currentHour <= 18) {
      return "G'day"
    }
    else if (currentHour > 18 && currentHour <= 22) {
      return 'Good evening'
    } else {
      return 'Welcome'
    }
  }

  return (
    <div className="welcome-page-container">
      <h1 className="welcome-page-title">{getTitleByTime()}, {meResult.data.me.profile.firstName}</h1>
      {!meResult.data.me.profile.isEditedByUser &&
        <div className="info" onClick={() => history.push('/createprofile')}><b>⚠ Create your profile</b></div>}
      <br></br>
      {userOrGroup.data.findUserOrGroup.__typename === 'Group' && 
      <div>You are using group profile for <i>{userOrGroup.data.findUserOrGroup.profile.name}</i></div>}
    </div>
  )
}

export default Welcome
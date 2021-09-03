import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { useHistory } from 'react-router'

import './Welcome.css'

import { FIND_USER_OR_GROUP, ME } from '../../../../graphql/queries'
import { UserContext } from '../../../UtilityComponents/UserContext'
import { Loading, SmallProfileImage } from '../../../UtilityComponents/UtilityComponents'

const Welcome = () => {
  const userContext = useContext(UserContext)
  const meResult = useQuery(ME)
  const userOrGroup = useQuery(FIND_USER_OR_GROUP, { variables: { id: userContext.sessionId } })
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

      <h1>{getTitleByTime()}, {meResult.data.me.profile.firstName}</h1>

      {!meResult.data.me.profile.isEditedByUser &&
        <div className="info" onClick={() => history.push('/createprofile')}><b>⚠ Create your profile</b></div>}
      <br />

      {userOrGroup.data.findUserOrGroup.__typename === 'Group' &&
        <div className="info" onClick={() => history.push(`/profiles/${userOrGroup.data.findUserOrGroup.id}`)}>
          <SmallProfileImage image={userOrGroup.data.findUserOrGroup.profile.image} /> &nbsp;
          <p>You are using group profile for <i>{userOrGroup.data.findUserOrGroup.profile.name}</i></p>
        </div>
      }

      <h1 className="secondary-text">What's new</h1>
      <div className="info">
        <p>⚠ <b>Disclaimer!</b> This app is a practical work and used for reference.</p>
      </div>
    </div>
  )
}

export default Welcome
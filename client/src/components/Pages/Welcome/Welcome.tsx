import React from 'react'
import { useQuery } from '@apollo/client'
import { useHistory } from 'react-router'

import { ME } from '../../../graphql/queries'
//import { SIGN_IN_TOKEN } from '../../../utils/constants'
import './Welcome.css'

const Welcome = () => {
  const result = useQuery(ME)
  const history = useHistory()

  //const token = localStorage.getItem(SIGN_IN_TOKEN)

  if (result.loading) {
    return <div>Loading...</div>
  }

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
    </div>
  )
}

export default Welcome
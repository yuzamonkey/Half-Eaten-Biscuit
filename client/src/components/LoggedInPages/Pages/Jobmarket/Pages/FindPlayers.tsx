import React from 'react'
import Profiles from '../../Profiles/Profiles'

const FindPlayers = () => {
  return (
    <div>
      <h1>Find players (only available ones)</h1>
      <ul><b>Filter: </b>
        <li>Group or individuals,</li>
        <li>By instrument, by group type</li>
      </ul>
    <Profiles />
    </div>
  )
}

export default FindPlayers
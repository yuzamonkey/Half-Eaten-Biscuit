import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from './UserContext'
import './UtilityComponents.css'


export const Loading = () => {
  return <div className="loading-container">
    ...Loading component...
  </div>
}

export const Toggle = ({ state, toggleClick }: any) => {
  return (
    <div
      className={state ? "toggle-container toggle-on" : "toggle-container toggle-off"}
      onClick={toggleClick}>
      <div
        className={state ? "toggle-circle toggle-on-circle" : "toggle-circle toggle-off-circle"}>
      </div>
    </div>
  )
}

export const Button = ({ text, handleClick }) => {
  return (
    <div
      className="button-container"
      onClick={handleClick}>
      {text}
    </div>
  )
}

export const Searchbar = () => {
  const [input, setInput] = useState('Search')

  const handleFocus = () => {
    if (input === 'Search') {
      setInput('')
    }
  }

  const handleBlur = () => {
    if (input === '') {
      setInput('Search')
    }
  }

  const handleSearch = () => {
    if (input !== 'Search') {
      console.log("HANDLE WITH PARAM", input)
      setInput('Search')
    }
  }

  return (
    <div className="searchbar-container">
      <div className="searchbar-outline">
        <input className="searchbar-input" value={input} onChange={e => setInput(e.target.value)} onFocus={handleFocus} onBlur={handleBlur}></input>
        <div className="searchbar-icon-container">
          <div className="searchbar-icon" onClick={handleSearch}>⚲</div>
        </div>
      </div>
    </div>
  )
}

export const SmallProfileImage = ({ image }) => {
  return (
    <img src={image} alt="profileimg" className="small-profile-image"></img>
  )
}

export const LargeProfileImage = ({ image }) => {
  return (
    <img src={image} alt="profileimg" className="large-profile-image"></img>
  )
}

export const SmallProfileCard = ({ id, image, name }) => {
  return (
    <div className="small-profile-card-container">
      <div className="upper-container">
        <div className="profile-image-container">
          <SmallProfileImage image={image} />
        </div>
      </div>
      <div className="lower-container">
        <div className="name-container">
          <h3 className="small-profile-name">{name}</h3>
        </div>
      </div>
    </div>

  )
}

export const LargeProfileCard = ({ id, image, name, skills, url, contactFunction }) => {
  const history = useHistory()
  const userContext = useContext(UserContext)
  return (
    <div className="large-profile-card-container">
      <div className="upper-container">
        <div className="profile-image-container">
          <LargeProfileImage image={image} />
        </div>
      </div>
      <div className="lower-container">
        <div className="name-container">
          <h3 className="profile-name">{name}</h3>
          {skills?.map(skill => <p key={skill.id}>{skill.profession}</p>)}
        </div>
        <div className="profiles-buttons-container">
          <Button text='Profile' handleClick={() => history.push(url)} />
          {id !== userContext.sessionId
            ? <Button text='Contact' handleClick={() => contactFunction} />
            : null
          }
        </div>
      </div>
    </div>
  )
}

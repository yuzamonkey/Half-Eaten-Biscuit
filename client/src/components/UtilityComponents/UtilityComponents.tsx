import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from './UserContext'
import './UtilityComponents.css'


export const Loading = () => {
  return <div className="loader">
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

export const Searchbar = ({input, setInput, handleInputChange}: any) => {
  
  // useEffect(() => {
  //   handleBlur()
  // }, [])

  // const handleFocus = () => {
  //   if (input === 'Search') {
  //     setInput('')
  //   }
  // }

  // const handleBlur = () => {
  //   if (input === '') {
  //     setInput('Search')
  //   }
  // }

  return (
    <div className="searchbar-container">
      <div className="searchbar-outline">
        {/* <input className="searchbar-input" value={input} onChange={e => handleInputChange(e)} onFocus={handleFocus} onBlur={handleBlur}></input> */}
        <input className="searchbar-input" value={input} onChange={e => setInput(e.target.value)}></input>
        <div className="searchbar-icon-container">
          <div className="searchbar-icon">⚲</div>
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
          {skills?.map(skill => <p key={skill.id}>{skill.profession || skill.name}</p>)}
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

export const CategorySelection = ({ allCategories, currentPath, skillsIncludeCategory, handlePathClick, handlePathChangeToPrevious }) => {
  return (
    <div className="skills-container">
      <h3>{currentPath.map(name => <span key={currentPath.indexOf(name)}>{name} → </span>)}</h3>
      {allCategories.map(obj => {
        return (
          currentPath[currentPath.length - 1] === obj.parent?.name &&
          <div
            className={skillsIncludeCategory(obj) ? "skill-container skill-container-selected" : "skill-container"}
            key={obj.id}
            onClick={() => handlePathClick(obj.name)}>
            {obj.name} {obj.children.length ? '→' : '☑'}</div>
        )
      })}
      <Button handleClick={() => handlePathChangeToPrevious()} text={`←`} />
    </div>
  )
}

import React, {useState} from 'react'
import './UtilityComponents.css'

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


//button,
//hover-info-box
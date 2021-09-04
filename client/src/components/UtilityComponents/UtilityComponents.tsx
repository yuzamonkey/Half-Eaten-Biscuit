import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { categoriesWithParentsRemoved } from '../../utils/utilityFunctions'
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

export const BlueButton = ({ text, handleClick }) => {
  return (
    <div
      className="blue-button-container"
      onClick={handleClick}>
      <p>
        {text}
      </p>
    </div>
  )
}

export const MoreInfoButton = ({ handleClick }) => {
  return (
    <div
      className="blue-button-container"
      onClick={handleClick}>
      <p>
        More info <i className="fa fa-info-circle faded-icon "/>
      </p>
    </div>
  )
}

export const ToProfileButton = ({ handleClick }) => {
  return (
    <div
      className="blue-button-container"
      onClick={handleClick}>
      <p>
        Profile <i className="fa fa-user faded-icon" />
      </p>
    </div>
  )
}

export const FormNavigationButton = ({ previous, handleClick }) => {
  const getClassName = () => {
    return previous
      ? "form-navigation-button-container previous"
      : "form-navigation-button-container next"
  }

  return (
    <div
      className={getClassName()}
      onClick={handleClick}>
      △
    </div>
  )
}

export const ContactButton = ({ handleClick }) => {
  return (
    <div
      className="contact-button"
      onClick={handleClick}>
      <p>
        Contact <i className="fa fa-comment faded-icon"></i>
      </p>
    </div>
  )
}

export const DisabledContactButton = () => {
  return (
    <div
      className="disabled contact-button">
      Contact <i className="fa fa-comment faded-icon"></i>
    </div>
  )
}

export const Searchbar = ({ input, setInput }: any) => {
  return (
    <div className="searchbar-container">
      <div className={input === '' ? "searchbar-outline empty" : "searchbar-outline"}>
        <input className="searchbar-input" value={input} onChange={e => setInput(e.target.value)}></input>
        <div className="searchbar-icon-container">
          <div className="searchbar-icon"><i className="fa fa-search"></i></div>
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

export const MediumProfileImage = ({ image }) => {
  return (
    <img src={image} alt="profileimg" className="medium-profile-image"></img>
  )
}

export const LargeProfileImage = ({ image }) => {
  return (
    <img src={image} alt="profileimg" className="large-profile-image"></img>
  )
}

export const VeryLargeProfileImage = ({ image }) => {
  return (
    <img src={image} alt="profileimg" className="very-large-profile-image"></img>
  )
}

export const SmallProfileCard = ({ name, image }) => {
  return (
    <div className="small-profile-card-container">
      <SmallProfileImage image={image} />
      <h3 className="small-profile-name">{name}</h3>
      <div></div>
    </div>
  )
}

export const MediumProfileCard = ({ image, name }) => {
  return (
    <div className="medium-profile-card-container">
      <div className="medium-upper-container">
        <div className="profile-image-container">
          <MediumProfileImage image={image} />
        </div>
      </div>
      <div className="medium-lower-container">
        <div className="name-container">
          <h3 className="medium-profile-name">{name}</h3>
        </div>
      </div>
    </div>
  )
}

export const LargeProfileCard = ({ id, image, name, categories, url, contactFunction }) => {
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
          {categoriesWithParentsRemoved(categories).map(category => <p key={category.id}>{category.profession || category.name}</p>)}
        </div>
        <div className="profiles-buttons-container">
          {/* <Button text='Profile' handleClick={() => history.push(url)} /> */}
          <ToProfileButton handleClick={() => history.push(url)} />
          {id !== userContext.sessionId
            // ? <Button text='Contact' handleClick={contactFunction} />
            ? <ContactButton handleClick={contactFunction} />
            : null
          }
        </div>
      </div>
    </div>
  )
}

export const CategorySelection = ({ allCategories, selectedCategories, setSelectedCategories, currentPath, setCurrentPath }) => {

  const categoriesIncludeCategory = (selectedObj) => {
    const objId = selectedObj.id
    let found = false
    selectedCategories.forEach(category => (objId === category.id) && (found = true))
    return found
  }

  const categoriesToRemove = (obj, children, removableArray) => {
    for (let child of children) {
      const childObj = allCategories.find(obj => obj.name === child.name)
      if (childObj && selectedCategories.map(s => s.id).includes(childObj?.id)) {
        removableArray = categoriesToRemove(childObj, childObj.children, removableArray)
      }
    }
    return removableArray.concat(obj)
  }

  const handlePathClick = (clickedName) => {
    const obj = allCategories.find(obj => obj.name === clickedName)
    if (obj) {
      if (!categoriesIncludeCategory(obj)) {
        obj.children.length && setCurrentPath(currentPath.concat(clickedName))
        setSelectedCategories(selectedCategories.concat(obj))
      } else if (categoriesIncludeCategory(obj)) {
        const removableArray = categoriesToRemove(obj, obj.children, [])
        const filteredCategories = selectedCategories.filter((category) => {
          return !removableArray.map(c => c.id).includes(category.id)
        })
        setSelectedCategories(filteredCategories)
      }
    }
  }

  const handlePathChangeToPrevious = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.splice(0, currentPath.length - 1))
    }
  }

  return (
    <div className="categories-container">
      {/* <h3>{currentPath.map(name => <span key={currentPath.indexOf(name)}>{name} → </span>)}</h3> */}
      {allCategories.map(obj => {
        return (
          currentPath[currentPath.length - 1] === obj.parent?.name &&
          <div
            key={obj.id}
            onClick={() => handlePathClick(obj.name)}
            className={categoriesIncludeCategory(obj) ? "category-container selected" : "category-container"}
          >
            <p>
              {obj.name} {obj.children.length ? '→' : '☑'}
            </p>
          </div>
        )
      })}
      {currentPath.length > 1
        &&
        <Button handleClick={() => handlePathChangeToPrevious()} text={`◁`} />
      }
    </div>
  )
}

export const TitleAndLogo = () => {
  return (
    <h3 className="title-and-logo" onClick={() => window.location.assign('/')}>HalfEatenBiscuit <i className="fas fa-cookie-bite"></i></h3>
  )
}

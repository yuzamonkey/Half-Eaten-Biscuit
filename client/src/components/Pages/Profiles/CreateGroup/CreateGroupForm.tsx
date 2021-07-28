import React, { useState } from "react"
import { Button } from "../../../UtilityComponents/UtilityComponents"
import NameAndImage from "./Views/NameAndImage"
import Summary from "./Views/Summary"
import UserSelection from "./Views/UserSelection"

const CreateGroupForm = () => {
  const [currentView, setCurrentView] = useState(0)
  const views = [
    <UserSelection />,
    <NameAndImage />,
    <Summary />
  ]

  const handlePrevPress = () => {
    currentView <= (views.length - 1) && currentView > 0 && setCurrentView(currentView - 1)
  }

  const handleNextPress = () => {
    currentView < (views.length - 1) && currentView >= 0 && setCurrentView(currentView + 1)
  }

  return (
    <div>
      <h1>Create group form component</h1>
      <div className="profile-edit-current-view">
        {views[currentView]}
      </div>
      <div className="profile-edit-switch-view-buttons-container">
        <Button handleClick={handlePrevPress} text="Prev" />
        <Button handleClick={handleNextPress} text="Next" />
      </div>
    </div>
  )
}

export default CreateGroupForm


/*
  const handlePrevPress = () => {
    currentView <= (views.length - 1) && currentView > 0 && setCurrentView(currentView - 1)
  }

  const handleNextPress = () => {
    currentView < (views.length - 1) && currentView >= 0 && setCurrentView(currentView + 1)
  }

  return (
    <div className="profile-edit-master-container">
      <h1>Create your profile/portfolio</h1>
      <div className="profile-edit-current-view">
        {views[currentView]}
      </div>
      <div className="profile-edit-switch-view-buttons-container">
        <Button handleClick={handlePrevPress} text="Prev" />
        <Button handleClick={handleNextPress} text="Next" />
      </div>
    </div>
  )
*/
import React, { useState } from "react"
import { FormNavigationButton } from "../../../../UtilityComponents/UtilityComponents"
import About from "./Views/About"
import GroupCategories from "./Views/GroupCategories"
import NameAndImage from "./Views/NameAndImage"
import Summary from "./Views/Summary"
import UserSelection from "./Views/UserSelection"

interface User {
  id: String
  username: String
}

const CreateGroupForm = () => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<User[]>([]);
  const [groupName, setGroupName] = useState('')
  const [about, setAbout] = useState('')
  const [image, setImage] = useState('')
  const [currentView, setCurrentView] = useState(0)
  const views = [
    <UserSelection selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />,
    <GroupCategories categories={categories} setCategories={setCategories} />,
    <NameAndImage groupName={groupName} setGroupName={setGroupName} image={image} setImage={setImage} />,
    <About text={about} setText={setAbout} />,
    <Summary selectedUsers={selectedUsers} groupName={groupName} image={image} categories={categories} about={about} />
  ]

  const handlePrevPress = () => {
    currentView <= (views.length - 1) && currentView > 0 && setCurrentView(currentView - 1)
  }

  const handleNextPress = () => {
    currentView < (views.length - 1) && currentView >= 0 && setCurrentView(currentView + 1)
  }

  return (
    <div className="create-group-form-container">
      <div className="create-group-current-view">
        {views[currentView]}
      </div>
      <div className="create-group-switch-view-buttons-container">
        <div>
          {currentView > 0
            &&
            <FormNavigationButton handleClick={handlePrevPress} previous={true} />
          }
        </div>
        <div>
          {currentView < (views.length - 1)
            &&
            <FormNavigationButton handleClick={handleNextPress} previous={false} />
          }
        </div>
      </div>
    </div>
  )
}

export default CreateGroupForm

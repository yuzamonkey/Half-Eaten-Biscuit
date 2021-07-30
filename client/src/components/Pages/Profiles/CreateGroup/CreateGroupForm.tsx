import React, { useState } from "react"
import { Button } from "../../../UtilityComponents/UtilityComponents"
import About from "./Views/About"
import GroupSkills from "./Views/GroupSkills"
import NameAndImage from "./Views/NameAndImage"
import Summary from "./Views/Summary"
import UserSelection from "./Views/UserSelection"

interface User {
  id: String
  username: String
}

const CreateGroupForm = () => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [skills, setSkills] = useState<User[]>([]);
  const [groupName, setGroupName] = useState('Group name')
  const [about, setAbout] = useState('')
  const [image, setImage] = useState('')
  const [currentView, setCurrentView] = useState(0)
  const views = [
    <UserSelection selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />,
    <GroupSkills skills={skills} setSkills={setSkills}/>,
    <NameAndImage groupName={groupName} setGroupName={setGroupName} image={image} setImage={setImage} />,
    <About text={about} setText={setAbout} />,
    <Summary selectedUsers={selectedUsers} groupName={groupName} image={image} skills={skills} about={about}/>
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
        <Button handleClick={handlePrevPress} text="Prev" />
        <Button handleClick={handleNextPress} text="Next" />
      </div>
    </div>
  )
}

export default CreateGroupForm

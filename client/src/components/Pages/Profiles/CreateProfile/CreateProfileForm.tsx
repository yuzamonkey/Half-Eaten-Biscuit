import { useState } from "react"
import About from "./Views/About"
import Skills from "./Views/Skills"
import Image from "./Views/Image"

import './CreateProfileForm.css'

/*
  Main views:
    Skills picker
    About
    Image
*/
interface Category {
  id: string,
  name: String,
  parent: Category
  children: [Category]
}


const CreateProfileForm = () => {
  const [currentView, setCurrentView] = useState(2)
  const [aboutText, setAboutText] = useState('')
  const [skills, setSkills] = useState<Category[]>([])
  const views = [
    <Skills skills={skills} setSkills={setSkills}/>,
    <About text={aboutText} setText={setAboutText} />,
    <Image />
  ]

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
        <button onClick={handlePrevPress}>Prev</button>
        {currentView}
        <button onClick={handleNextPress}>Next</button>
      </div>
    </div>
  )
}

export default CreateProfileForm
import { useState } from "react"

import CreateProfileInfo from "./Views/CreateProfileInfo"
import Skills from "./Views/Skills"
import About from "./Views/About"
import Image from "./Views/Image"
import Summary from "./Views/Summary"

import './CreateProfileForm.css'
import { useQuery } from "@apollo/client"
import { ME } from "../../../../graphql/queries"

interface Category {
  id: string,
  name: String,
  parent: Category
  children: [Category]
}

const CreateProfileForm = () => {
  const [currentView, setCurrentView] = useState(0)
  const [skills, setSkills] = useState<Category[]>([])
  const [aboutText, setAboutText] = useState('')
  const [image, setImage] = useState()
  const { loading, data } = useQuery(ME, { onCompleted: () => {
    setSkills(data.me.profile.skills)
    setImage(data.me.profile.image)
    setAboutText(data.me.profile.about)
  } })
  const views = [
    <CreateProfileInfo name={data?.me.username}/>,
    <Skills skills={skills} setSkills={setSkills} />,
    <About text={aboutText} setText={setAboutText} />,
    <Image image={image} setImage={setImage} />,
    <Summary skills={skills} about={aboutText} image={image} />
  ]

  if (loading) {
    return <div>Loading...</div>
  }

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
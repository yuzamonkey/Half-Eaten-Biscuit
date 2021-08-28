import { useState } from "react"

import CreateProfileInfo from "./Views/CreateProfileInfo"
import Skills from "./Views/Skills"
import About from "./Views/About"
import Image from "./Views/Image"
import Summary from "./Views/Summary"

import './CreateProfileForm.css'
import { useQuery } from "@apollo/client"
import { ME } from "../../../../../graphql/queries"
import { Button, Loading } from "../../../../UtilityComponents/UtilityComponents"

interface Category {
  id: string,
  name: String,
  parent: Category
  children: [Category]
}

const CreateProfileForm = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [aboutText, setAboutText] = useState('')
  const [image, setImage] = useState()
  const { loading, data } = useQuery(ME, { onCompleted: () => {
    setCategories(data.me.profile.categories)
    setImage(data.me.profile.image)
    setAboutText(data.me.profile.about)
  } })
  const [currentView, setCurrentView] = useState(0)
  const views = [
    <CreateProfileInfo name={data?.me.username}/>,
    <Skills categories={categories} setCategories={setCategories} />,
    <About text={aboutText} setText={setAboutText} />,
    <Image image={image} setImage={setImage} />,
    <Summary categories={categories} about={aboutText} image={image} />
  ]

  if (loading) {
    return <Loading />
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
        <Button handleClick={handlePrevPress} text="Prev" />
        <Button handleClick={handleNextPress} text="Next" />
      </div>
    </div>
  )
}

export default CreateProfileForm
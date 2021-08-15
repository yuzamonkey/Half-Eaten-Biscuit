import { useState } from "react"
import { CategorySelection } from "../../../../../UtilityComponents/UtilityComponents"

interface Category {
  id: string,
  name: string
}

const WantedCategoriesSelection = ({ skillCategories, groupCategories, wantedCategories, setWantedCategories }) => {
  const [currentPath, setCurrentPath] = useState([undefined])
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  
  // const skillsIncludeCategory = (selectedObj) => {
  //   const objId = selectedObj.id
  //   let found = false
  //   wantedCategories.forEach(skill => (objId === skill.id) && (found = true))
  //   return found
  // }

  // const handlePathClick = (clickedName) => {
  //   const obj = skillCategories.find(obj => obj.name === clickedName) || groupCategories.find(obj => obj.name === clickedName)
  //   obj && !skillsIncludeCategory(obj) && setWantedCategories(wantedCategories.concat(obj))
  //   obj?.children.length && setCurrentPath(currentPath.concat(clickedName))
  // }

  // const handlePathChangeToPrevious = () => {
  //   if (currentPath.length > 1) {
  //     setCurrentPath(currentPath.splice(0, currentPath.length - 1))
  //   }
  // }

  return (
    <div>
      <h2>Select your wantedCategories</h2>
      <button onClick={() => setSelectedCategories(skillCategories)}>I'm looking for individual artists</button>
      <button onClick={() => setSelectedCategories(groupCategories)}>I'm looking for a group</button>
      {/* <CategorySelection
        allCategories={selectedCategories}
        currentPath={currentPath}
        skillsIncludeCategory={skillsIncludeCategory}
        handlePathClick={handlePathClick}
        handlePathChangeToPrevious={handlePathChangeToPrevious}
      /> */}
        <CategorySelection
        selectedCategories={wantedCategories}
        setSelectedCategories={setWantedCategories}
        allCategories={selectedCategories}
        currentPath={currentPath}
        setCurrentPath={setCurrentPath}
      />
      {wantedCategories.map(s => <div key={s.id}>{s.name}</div>)}
    </div>
  )
}

export default WantedCategoriesSelection
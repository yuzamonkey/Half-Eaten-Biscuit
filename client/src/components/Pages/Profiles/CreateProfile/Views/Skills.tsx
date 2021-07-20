import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_CATEGORIES } from "../../../../../graphql/queries"

import './Skills.css'
import { Button } from "../../../../../utils/UtilityComponents/UtilityComponents"

interface Category {
  id: string,
  name: String,
  parent: Category
  children: [Category]
}

const Skills = ({ skills, setSkills }) => {
  const [allCategories, setAllCategories] = useState<Category[]>([])
  const [currentPath, setCurrentPath] = useState([undefined])
  const { loading, data } = useQuery(ALL_CATEGORIES, { onCompleted: () => setAllCategories(data.allCategories) })

  if (loading) return <div>Loading...</div>

  const skillsIncludeCategory = (selectedObj) => {
    const objId = selectedObj.id
    let found = false
    skills.forEach(skill => (objId === skill.id) && (found = true))
    return found
  }
  
  const handlePathClick = (clickedName) => {
    const obj = allCategories.find(obj => obj.name === clickedName)
    obj && !skillsIncludeCategory(obj) && setSkills(skills.concat(obj))
    obj?.children.length && setCurrentPath(currentPath.concat(clickedName))
  }
  
  const handlePathChangeToPrevious = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.splice(0, currentPath.length - 1))
    }
  }

  return (
    <div className="skills-container">
      <h2>Select your skills</h2>
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
      {skills.map(s => <div>{s.name}</div>)}
    </div>
  )
}

export default Skills
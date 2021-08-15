import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_SKILL_CATEGORIES } from "../../../../../graphql/queries"

import { CategorySelection, Loading } from "../../../../UtilityComponents/UtilityComponents"

interface Category {
  id: string,
  name: String,
  parent: Category
  children: [Category]
}

const Skills = ({ skills, setSkills }) => {
  const [allCategories, setAllCategories] = useState<Category[]>([])
  const [currentPath, setCurrentPath] = useState([undefined])
  const { loading, data } = useQuery(ALL_SKILL_CATEGORIES, { onCompleted: () => setAllCategories(data.allSkillCategories) })

  if (loading) return <Loading />

  const skillsIncludeCategory = (selectedObj) => {
    const objId = selectedObj.id
    let found = false
    skills.forEach(skill => (objId === skill.id) && (found = true))
    return found
  }

  //ADD THESE METHODS TO CATEGORY SELECTION, Sun 15. 11.00

  const removableCategories = (obj, children, removableArray) => {
    for (let child of children) {
      const childObj = allCategories.find(obj => obj.name === child.name)
      if (childObj && skills.map(s => s.id).includes(childObj?.id)) {
        removableArray = removableCategories(childObj, childObj.children, removableArray)
      }
    }
    return removableArray.concat(obj)
  }

  const handlePathClick = (clickedName) => {
    const obj = allCategories.find(obj => obj.name === clickedName)
    if (obj && !skillsIncludeCategory(obj)) {
      setSkills(skills.concat(obj))
      obj.children.length && setCurrentPath(currentPath.concat(clickedName))
    } else if (obj && skillsIncludeCategory(obj)) {
      const removableArray = removableCategories(obj, obj.children, [])
      setSkills(skills.filter((category) => removableArray.indexOf(category) === -1))
    }
  }

  const handlePathChangeToPrevious = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.splice(0, currentPath.length - 1))
    }
  }

  return (
    <div>
      <h2>Select your skills</h2>
      <CategorySelection
        allCategories={allCategories}
        currentPath={currentPath}
        skillsIncludeCategory={skillsIncludeCategory}
        handlePathClick={handlePathClick}
        handlePathChangeToPrevious={handlePathChangeToPrevious}
      />
      {skills.map(s => <div key={s.id}>{s.name}</div>)}
    </div>
  )
}

export default Skills
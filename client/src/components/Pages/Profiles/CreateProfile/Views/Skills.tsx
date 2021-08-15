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

  const categoriesToRemove = (obj, children, removableArray) => {
    for (let child of children) {
      const childObj = allCategories.find(obj => obj.name === child.name)
      if (childObj && skills.map(s => s.id).includes(childObj?.id)) {
        removableArray = categoriesToRemove(childObj, childObj.children, removableArray)
      }
    }
    return removableArray.concat(obj)
  }

  const handlePathClick = (clickedName) => {
    const obj = allCategories.find(obj => obj.name === clickedName)
    if (obj) {
      if (!skillsIncludeCategory(obj)) {
        obj.children.length && setCurrentPath(currentPath.concat(clickedName))
        setSkills(skills.concat(obj))
      } else if (skillsIncludeCategory(obj)) {
        const removableArray = categoriesToRemove(obj, obj.children, [])
        const filteredSkills = skills.filter((category) => {
          return !removableArray.map(c => c.id).includes(category.id)
        })
        setSkills(filteredSkills)
      }
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
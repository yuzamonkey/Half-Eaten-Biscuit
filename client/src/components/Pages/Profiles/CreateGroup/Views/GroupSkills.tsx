import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_GROUP_SKILL_CATEGORIES } from "../../../../../graphql/queries"

import { CategorySelection, Loading } from "../../../../UtilityComponents/UtilityComponents"

interface Category {
  id: string,
  name: String,
  parent: Category
  children: [Category]
}

const GroupSkills = ({ skills, setSkills }) => {
  const [allCategories, setAllCategories] = useState<Category[]>([])
  const [currentPath, setCurrentPath] = useState([undefined])
  const { loading, data } = useQuery(ALL_GROUP_SKILL_CATEGORIES, { onCompleted: () => setAllCategories(data.allGroupSkillCategories) })

  if (loading) return <Loading />

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

export default GroupSkills
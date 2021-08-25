import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_GROUP_CATEGORIES } from "../../../../../graphql/queries"

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
  const { loading, data } = useQuery(ALL_GROUP_CATEGORIES, { onCompleted: () => setAllCategories(data.allGroupCategories) })

  if (loading) return <Loading />
  
  return (
    <div>
    <h2>Select your skills</h2>
      <CategorySelection
        selectedCategories={skills}
        setSelectedCategories={setSkills}
        allCategories={allCategories}
        currentPath={currentPath}
        setCurrentPath={setCurrentPath}
      />
    {skills.map(s => <div key={s.id}>{s.name}</div>)}
  </div>
  )
}

export default GroupSkills
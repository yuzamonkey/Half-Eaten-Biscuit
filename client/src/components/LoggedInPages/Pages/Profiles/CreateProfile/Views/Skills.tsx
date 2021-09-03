import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_USER_CATEGORIES } from "../../../../../../graphql/queries"

import { CategorySelection, Loading } from "../../../../../UtilityComponents/UtilityComponents"

interface Category {
  id: string,
  name: String,
  profession: String,
  parent: Category,
  children: [Category]
}

const Skills = ({ categories, setCategories }) => {
  const [allCategories, setAllCategories] = useState<Category[]>([])
  const [currentPath, setCurrentPath] = useState([undefined])
  const { loading, data } = useQuery(ALL_USER_CATEGORIES, { onCompleted: () => setAllCategories(data.allUserCategories) })

  if (loading) {
    return (
      <div className="category-selection-container">
        <Loading />
      </div>
    )
  }

  return (
    <div className="category-selection-container">
      <h2>What do you do?</h2>
      <CategorySelection
        selectedCategories={categories}
        setSelectedCategories={setCategories}
        allCategories={allCategories}
        currentPath={currentPath}
        setCurrentPath={setCurrentPath}
      />
      {/* {categories.map(s => <div key={s.id}>{s.name}</div>)} */}
    </div>
  )
}

export default Skills
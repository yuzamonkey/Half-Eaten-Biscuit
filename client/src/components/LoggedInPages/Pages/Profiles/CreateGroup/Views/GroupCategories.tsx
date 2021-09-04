import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_GROUP_CATEGORIES } from "../../../../../../graphql/queries"

import { CategorySelection, Loading } from "../../../../../UtilityComponents/UtilityComponents"

interface Category {
  id: string,
  name: String,
  parent: Category
  children: [Category]
}

const GroupCategories = ({ categories, setCategories }) => {
  const [allCategories, setAllCategories] = useState<Category[]>([])
  const [currentPath, setCurrentPath] = useState([undefined])
  const { loading, data } = useQuery(ALL_GROUP_CATEGORIES, {
    onCompleted: () => setAllCategories(data.allGroupCategories)
  })

  if (loading) {
    return (
      <div className="category-selection-container">
        <Loading />
      </div>
    )
  }

  return (
    <div className="category-selection-container">
      <h2 className="secondary-text">Select group type</h2>
      <CategorySelection
        selectedCategories={categories}
        setSelectedCategories={setCategories}
        allCategories={allCategories}
        currentPath={currentPath}
        setCurrentPath={setCurrentPath}
      />
    </div>
  )
}

export default GroupCategories
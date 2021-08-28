import { useState } from "react"
import { CategorySelection } from "../../../../../../UtilityComponents/UtilityComponents"

interface Category {
  id: string,
  name: string
}

const WantedCategoriesSelection = ({ skillCategories, groupCategories, wantedCategories, setWantedCategories }) => {
  const [currentPath, setCurrentPath] = useState([undefined])
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])

  return (
    <div>
      <h2>Select your wantedCategories</h2>
      <button onClick={() => setSelectedCategories(skillCategories)}>I'm looking for individual artists</button>
      <button onClick={() => setSelectedCategories(groupCategories)}>I'm looking for a group</button>
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
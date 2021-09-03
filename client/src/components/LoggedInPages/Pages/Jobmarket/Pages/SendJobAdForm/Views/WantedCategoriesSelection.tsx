import { useState } from "react"
import { Button, CategorySelection } from "../../../../../../UtilityComponents/UtilityComponents"

interface Category {
  id: string,
  name: string,
  __typename: string
}

const WantedCategoriesSelection = ({ userCategories, groupCategories, wantedCategories, setWantedCategories }) => {
  // const [hasSelected, setHasSelected] = useState(false)
  const [currentPath, setCurrentPath] = useState([undefined])
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])

  const handleSelection = (selection) => {
    if (selection === 'user') {
      if (wantedCategories.map(c => c.__typename).includes('UserCategory')) {
        setWantedCategories(wantedCategories.filter(c => c.__typename !== 'UserCategory'))
      } else {
        setSelectedCategories(userCategories)
      }
    } else {
      if (wantedCategories.map(c => c.__typename).includes('GroupCategory')) {
        setWantedCategories(wantedCategories.filter(c => c.__typename !== 'GroupCategory'))
      } else {
        setSelectedCategories(groupCategories)
      }
    }
  }

  const userCategoriesSelectionClassName = () => {
    return wantedCategories.map(c => c.__typename).includes('UserCategory')
      ? "category-container selected"
      : "category-container"
  }

  const groupCategoriesSelectionClassName = () => {
    return wantedCategories.map(c => c.__typename).includes('GroupCategory')
      ? "category-container selected"
      : "category-container"
  }

  return (
    <div className="wanted-category-selection-container">
      {selectedCategories.length === 0
        ?
        <div className="selection">
          <div className={userCategoriesSelectionClassName()} onClick={() => handleSelection('user')}>
            <p>
              I'm looking for individual artists →
            </p>
          </div>
          <div className={groupCategoriesSelectionClassName()} onClick={() => handleSelection('group')}>
            <p>
              I'm looking for a group →
            </p>
          </div>
        </div>
        :
        <div>
          <CategorySelection
            selectedCategories={wantedCategories}
            setSelectedCategories={setWantedCategories}
            allCategories={selectedCategories}
            currentPath={currentPath}
            setCurrentPath={setCurrentPath}
          />
          <div className="back-to-selection-button-container">
            {currentPath.length === 1
              &&
              <Button handleClick={() => setSelectedCategories([])} text={`◁`} />
            }
          </div>
        </div>
      }
      {wantedCategories.map(c => <div key={c.id}>{c.name}</div>)}
    </div>
  )
}

export default WantedCategoriesSelection
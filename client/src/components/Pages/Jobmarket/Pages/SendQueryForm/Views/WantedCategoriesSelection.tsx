const WantedCategoriesSelection = ({ allCategories, wantedCategories, setWantedCategories }) => {
  
  const handleCategoryClick = (category) => {
    if (!wantedCategories.includes(category)) {
      setWantedCategories(wantedCategories.concat(category))
    }
  }

  return (
    <div>
      <h1>Wanted categories selection</h1>
      <div>
        <b>Select categories:</b>
        {allCategories.map(category => <div onClick={() => handleCategoryClick(category)}>{category.name}</div>)}
      </div>
      <div>
        <b>Selected categories:</b>
        {wantedCategories.map(category => <div>{category.name}</div>)}
      </div>
    </div>
  )
}

export default WantedCategoriesSelection

interface Category {
  id: string,
  name: string
  profession: string
}

export const categoriesWithParentsRemoved = (categories): Category[] => {
  let filtered = [...categories]
  for (let category of categories) {
    const parentObj = filtered.find(c => c.name === category.parent?.name)
    if (parentObj) {
      filtered = filtered.filter(c => c.name !== parentObj.name)
    }
  }
  return filtered
}

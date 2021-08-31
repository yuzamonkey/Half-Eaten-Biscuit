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

export const dateAsDDMMYYYY = (dateInput) => {
  const date = dateInput.substring(0, 10)
  const year = date.substring(0,4)
  const month = date.substring(5, 7)
  const day = date.substring(8, 10)
  return `${day}.${month}.${year}`
}
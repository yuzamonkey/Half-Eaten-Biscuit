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

export const getTodaysDate = (): string => {
  const date = new Date();
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return yyyy + '/' + mm + '/' + dd;
}

export const dateAsDDMMYYYY = (dateInput) => {
  const date = dateInput.substring(0, 10)
  const year = date.substring(0,4)
  const month = date.substring(5, 7)
  const day = date.substring(8, 10)
  return `${day}.${month}.${year}`
}


export const textAsArray = (text: string): string[] => {
  const result = text.split('\n')
  return result
}
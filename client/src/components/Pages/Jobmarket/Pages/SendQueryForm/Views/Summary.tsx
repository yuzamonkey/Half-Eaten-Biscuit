import { useMutation } from "@apollo/client"
import { useContext } from "react"
import { CREATE_JOBQUERY } from "../../../../../../graphql/mutations"
import { UserContext } from "../../../../../UtilityComponents/UserContext"
import { Button } from "../../../../../UtilityComponents/UtilityComponents"

interface Category {
  id: string,
  name: string
}

const Summary = ({ wantedCategories, content, location, salary, startSchedule, endSchedule, }) => {

  const userContext = useContext(UserContext)

  const [createQuery] = useMutation(CREATE_JOBQUERY, {
    onError: (error) => {
      console.log("Error at create query mutation: \n", error)
    }
  })

  const categoriesWithParentsRemoved = (categories) : Category[] => {
    let filtered = [...categories]
    for (let category of categories) {
      const parentObj = filtered.find(c => c.name === category.parent?.name)
      if (parentObj) {
        filtered = filtered.filter(c => c.name !== parentObj.name)
      }
    }
    return filtered
  }

  const submit = () => {
    const postedBy = userContext.sessionId
    const parentsRemoved = categoriesWithParentsRemoved(wantedCategories)
    const categoryIds = parentsRemoved.map(c => c.id)

    createQuery({
      variables: {
        content: content,
        startSchedule: startSchedule,
        endSchedule: endSchedule,
        wantedCategories: categoryIds,
        postedBy: postedBy,
        salary: salary,
        location: location
      }
    })
  }

  return (
    <div>
      <h1>Summary</h1>
      {categoriesWithParentsRemoved(wantedCategories).map(category => <div key={category.id}>{category.name}</div>)}
      <p>content: {content}</p>
      <p>location: {location}</p>
      <p>salary: {salary}</p>
      <p>startSchedule: {startSchedule}</p>
      <p>endSchedule: {endSchedule}</p>
      <Button text="Submit" handleClick={submit} />
    </div>
  )
}

export default Summary
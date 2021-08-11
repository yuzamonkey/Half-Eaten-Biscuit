import { useMutation } from "@apollo/client"
import { useContext } from "react"
import { CREATE_JOBQUERY } from "../../../../../../graphql/mutations"
import { UserContext } from "../../../../../UtilityComponents/UserContext"
import { Button } from "../../../../../UtilityComponents/UtilityComponents"

const Summary = ({ wantedCategories, content, location, salary, startSchedule, endSchedule, }) => {

  const userContext = useContext(UserContext)

  const [createQuery] = useMutation(CREATE_JOBQUERY, {
    onError: (error) => {
      console.log("Error at create query mutation: \n", error)
    }
  })

  const submit = async (event: any) => {
    event.preventDefault()
    const postedBy = userContext.sessionId
    const wantedCategoryIds = wantedCategories.map(c => c.id)

    createQuery({
      variables: {
        content: content,
        startSchedule: startSchedule,
        endSchedule: endSchedule,
        wantedCategories: wantedCategoryIds,
        postedBy: postedBy,
        salary: salary,
        location: location
      }
    })
  }

  return (
    <div>
      <h1>Summary</h1>
      {wantedCategories.map(category => <div>{category.name}</div>)}
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
import { useMutation, useQuery } from "@apollo/client"
import { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { CREATE_JOBAD } from "../../../../../../../graphql/mutations"
import { NAME_AND_IMAGE } from "../../../../../../../graphql/queries"
import { categoriesWithParentsRemoved } from "../../../../../../../utils/utilityFunctions"
import { UserContext } from "../../../../../../UtilityComponents/UserContext"
import { BlueButton, Loading } from "../../../../../../UtilityComponents/UtilityComponents"
import JobDetails from "../../JobDetails"


const Summary = ({ wantedCategories, content, location, salary, startSchedule, endSchedule, }) => {
  const userContext = useContext(UserContext)
  const history = useHistory()
  const [submitCompleted, setSubmitCompleted] = useState(false)
  const [redirectAdress, setRedirectAdress] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const nameAndImage = useQuery(NAME_AND_IMAGE, { variables: { id: userContext.sessionId } })

  const [createQuery, { loading }] = useMutation(CREATE_JOBAD, {
    onError: (error) => {
      console.log("Error at create query mutation: \n", error)
      setErrorMessage(error.message)
    }
  })

  const submit = async () => {
    if (validationOk()) {
      const postedBy = userContext.sessionId
      const parentsRemoved = categoriesWithParentsRemoved(wantedCategories)
      const categoryIds = parentsRemoved.map(c => c.id)

      const response = await createQuery({
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
      console.log("POSTED JOBAD RESPONSE", response)
      if (response.data?.createJobAd.content === content) {
        setSubmitCompleted(true)
        setRedirectAdress(`/jobmarket/jobads/${response.data.createJobAd.id}`)
      }
    }
  }

  const validationOk = () => {
    if (wantedCategories.length === 0) {
      setErrorMessage('No selected categories')
      return false;
    }
    if (content === '') {
      setErrorMessage('Description missing')
      return false;
    }
    if (!location) {
      setErrorMessage('Location missing')
      return false;
    }
    if (!salary) {
      setErrorMessage('Salary missing')
      return false;
    }
    if (!startSchedule) {
      setErrorMessage('Starting date missing')
      return false;
    }
    if (!endSchedule) {
      setErrorMessage('End date missing')
      return false;
    }
    return true
  }

  if (loading || nameAndImage.loading) {
    return <Loading />
  }

  const job = {
    postedBy: {
      object: {
        profile: {
          name: nameAndImage.data.findUserOrGroup.profile.name || null,
          image: nameAndImage.data.findUserOrGroup.profile.image || null,
        }
      }
    },
    wantedCategories: categoriesWithParentsRemoved(wantedCategories).map(category => {
      return { object: category }
    }),
    salary: salary,
    location: location,
    startSchedule: startSchedule,
    endSchedule: endSchedule,
    content: content
  }

  return (
    <div className="job-ad-form-summary-container">
      {!submitCompleted
        ?
        <div className="job-ad-form-summary-items-container">
          <div>
            <h1 className="secondary-text">Preview</h1>
            <h1 className="error-message">{errorMessage}</h1>
            <JobDetails job={job} />
          </div>
          <div className="submit-button-container">
            <BlueButton text="Send" handleClick={submit} />
          </div>
        </div>
        :
        <div className="job-ad-submitted-container">
          <h1>Jobpost added!</h1>
          <div className="submit-button-container">
            <BlueButton text="See it here" handleClick={() => history.push(redirectAdress)} />
          </div>
        </div>
      }
    </div>
  )
}

export default Summary
import { useState } from "react"
import { getTodaysDate } from "../../../../../../../utils/utilityFunctions"

const JobAdInfoForm = ({
  content,
  setContent,
  location,
  setLocation,
  salary,
  setSalary,
  startSchedule,
  setStartSchedule,
  endSchedule,
  setEndSchedule,
}) => {
  const yes = 'Yes'
  const no = 'No'
  const giveValue = 'Yes, value'
  const negotiable = 'Negotiable'

  const [showSalaryInput, setShowSalaryInput] = useState(salary !== (yes || no || negotiable))
  const [errorMessage, setErrorMessage] = useState('')

  const updateErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage('')
    }, 5000)
  }

  const dateIsInThePast = (value) => {
    const today = getTodaysDate()
    const compareTo = new Date(today).getTime()
    const selectedDate = new Date(value).getTime()
    if (selectedDate < compareTo) {
      updateErrorMessage('Selected date is in the past')
      return true
    }
    updateErrorMessage('')
    return false
  }

  const endDateIsBeforeStartDate = (value) => {
    const startDate = new Date(startSchedule).getTime()
    const selectedDate = new Date(value).getTime()
    if (selectedDate < startDate) {
      updateErrorMessage('Selected end date is before starting date')
      return true
    }
    updateErrorMessage('')
    return false
  }

  const handleStartScheduleChange = (value) => {
    if (dateIsInThePast(value)) {
      return
    }
    setStartSchedule(value)
    setEndSchedule(value)

  }

  const handleEndScheduleChange = (value) => {
    if (dateIsInThePast(value)) {
      return
    }
    if (endDateIsBeforeStartDate(value)) {
      return
    }
    setEndSchedule(value)
  }

  const handleSalaryChange = (value) => {
    if (value === giveValue) {
      setSalary('200')
      setShowSalaryInput(true)
    } else {
      setShowSalaryInput(false)
      setSalary(value)
    }
  }

  return (
    <div className="job-ad-info-form-container">
      <div className="error-message-container">
        {errorMessage}
      </div>

      <div className="job-ad-info-form-inputs">
        <div>
          <h2 className="secondary-text">Description</h2>
          <textarea
            cols={50}
            rows={10}
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
        </div>

        <div className="smaller-inputs">
          <div>
            <h2 className="secondary-text">Starting</h2>
            <input
              type="date"
              value={startSchedule}
              onChange={({ target }) => handleStartScheduleChange(target.value)}
            />
          </div>
          <div>
            <h2 className="secondary-text">Ending</h2>
            <input
              type="date"
              value={endSchedule}
              onChange={({ target }) => handleEndScheduleChange(target.value)}
            />
          </div>
          <div>
            <h2 className="secondary-text">Location</h2>
            <input
              maxLength={20}
              value={location}
              onChange={({ target }) => setLocation(target.value)}
            />
          </div>
          <div>
            <h2 className="secondary-text">Salary</h2>
            <select onChange={({ target }) => handleSalaryChange(target.value)}>
              <option value={yes} selected={salary === yes}>Yes</option>
              <option value={giveValue} selected={salary !== (yes || no || negotiable)}>Yes, give value</option>
              <option value={negotiable} selected={salary === negotiable}>Negotiable</option>
              <option value={no} selected={salary === no}>No</option>
            </select>
            &nbsp;
            {showSalaryInput &&
              <>
                <input
                  min={0}
                  max={5000}
                  type="number"
                  value={salary}
                  onChange={({ target }) => setSalary(target.value)}
                />
                €
              </>
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default JobAdInfoForm
import { useState } from "react"

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

  const [showSalaryInput, setShowSalaryInput] = useState(false)

  const handleSalaryChange = (value) => {
    if (value === 'Yes, give value') {
      setSalary('')
      setShowSalaryInput(true)
    } else {
      setShowSalaryInput(false)
      setSalary(value)
    }
  }

  return (
    <div className="job-ad-info-form-container">

      <div>
        <h2 className="secondary-text">Description</h2>
        <textarea
          cols={50}
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div>
        <div>
          <h2 className="secondary-text">Starting</h2>
          <input
            type="date"
            value={startSchedule}
            onChange={({ target }) => setStartSchedule(target.value)}
          />
        </div>
        <div>
          <h2 className="secondary-text">Ending</h2>
          <input
            type="date"
            value={endSchedule}
            onChange={({ target }) => setEndSchedule(target.value)}
          />
        </div>
        <div>
          <h2 className="secondary-text">Location</h2>
          <input
            value={location}
            onChange={({ target }) => setLocation(target.value)}
          />
        </div>
        <div>
          <h2 className="secondary-text">Salary</h2>
          <select onChange={({ target }) => handleSalaryChange(target.value)}>
            <option>Yes</option>
            <option>Yes, give value</option>
            <option>Negotiable</option>
            <option>No</option>
          </select>
          {showSalaryInput &&
            <>
                <input
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
  )
}

export default JobAdInfoForm
const JobqueryInfoForm = ({
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
  return (
    <div>
      <h1>
        Jobquery info form
      </h1>
      <div>
        description <textarea
          cols={50}
          rows={5}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>
      <div>
        location <input
          value={location}
          onChange={({ target }) => setLocation(target.value)}
        />
      </div>
      <div>
        salary <input
          value={salary}
          onChange={({ target }) => setSalary(target.value)}
        />
      </div>
      <div>
        startSchedule (or Day, Month, Year dropdowns?)<input
          value={startSchedule}
          onChange={({ target }) => setStartSchedule(target.value)}
        />
      </div>
      <div>
        endSchedule <input
          value={endSchedule}
          onChange={({ target }) => setEndSchedule(target.value)}
        />
      </div>
    </div>
  )
}

export default JobqueryInfoForm
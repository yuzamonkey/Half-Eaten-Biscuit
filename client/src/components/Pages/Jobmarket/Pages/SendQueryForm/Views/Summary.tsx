const Summary = ({
  wantedCategories,
  content,
  location,
  salary,
  startSchedule,
  endSchedule,
}) => {
  return (
    <div>
      <h1>Summary</h1>
      {wantedCategories.map(category => <div>{category.name}</div>)}
      <p>content: {content}</p>
      <p>location: {location}</p>
      <p>salary: {salary}</p>
      <p>startSchedule: {startSchedule}</p>
      <p>endSchedule: {endSchedule}</p>
      <button>Submit</button>
    </div>
  )
}

export default Summary
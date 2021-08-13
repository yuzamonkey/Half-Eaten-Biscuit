import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom"
import { FIND_JOBQUERY } from "../../../../graphql/queries";
import { LargeProfileImage, Loading } from "../../../UtilityComponents/UtilityComponents";

const JobInfo = () => {
  const { id }: any = useParams();
  const jobInfoResult = useQuery(FIND_JOBQUERY, {
    variables: { id }
  })

  if (jobInfoResult.loading) {
    return <Loading />
  }

  if (!jobInfoResult.data) {
    return <h1>Not found. The post might not be visible, or the poster has removed this query.</h1>
  }
  const q = jobInfoResult.data.findJobquery

  return (
    <div>
      <LargeProfileImage image={q.postedBy.object.profile.image} />
      <div className="general-info-container">
        <div className="image-and-name-container">

          <p><b>{q.postedBy.object.username || q.postedBy.object.profile.name}</b> is looking for <br />
            {q.wantedCategories.map(category => category.object.name)}
          </p>

        </div>
        {/* <p>{q.content}</p> */}
        <div className="details-container">
          <div className="details-item">
            <p>Salary</p>
            <p className="details-value">{q.salary}</p>
          </div>
          <div className="details-item">
            <p>Location</p>
            <p className="details-value">{q.location}</p>
          </div>
          <div className="details-item">
            <p>Schedule</p>
            <p className="details-value">{q.startSchedule.substring(0, 10)} •••  {q.endSchedule.substring(0, 10)}</p>
          </div>
        </div>
      </div>
      {q.content}
    </div>
  )
}

export default JobInfo
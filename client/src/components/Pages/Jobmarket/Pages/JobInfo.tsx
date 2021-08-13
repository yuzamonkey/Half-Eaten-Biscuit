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
  const query = jobInfoResult.data.findJobquery

  return (
    <div>
      <LargeProfileImage image={query.postedBy.object.profile.image} />
      <div className="general-info-container">
        <div className="image-and-name-container">

          <p><b>{query.postedBy.object.username || query.postedBy.object.profile.name}</b> is looking for <br />
            {query.wantedCategories.map(category => category.object.name)}
          </p>

        </div>
        {/* <p>{query.content}</p> */}
        <div className="details-container">
          <div className="details-item">
            <p>Salary</p>
            <p className="details-value">{query.salary}</p>
          </div>
          <div className="details-item">
            <p>Location</p>
            <p className="details-value">{query.location}</p>
          </div>
          <div className="details-item">
            <p>Schedule</p>
            <p className="details-value">{query.startSchedule.substring(0, 10)} •••  {query.endSchedule.substring(0, 10)}</p>
          </div>
        </div>
      </div>
      {query.content}
    </div>
  )
}

export default JobInfo
import { dateAsDDMMYYYY } from "../../../../utils/utilityFunctions"
import { LargeProfileImage } from "../../../UtilityComponents/UtilityComponents"

const JobDetails = ({ job }) => {
  if (job) {
    return (
      <div>
        <LargeProfileImage image={job.postedBy.object.profile.image} />
        <div className="general-info-container">
          <div className="image-and-name-container">

            <p><b>{job.postedBy.object.username || job.postedBy.object.profile.name}</b> is looking for <br />
              {job.wantedCategories.map(category => category.object.name)}
            </p>

          </div>
          {/* <p>{job.content}</p> */}
          <div className="details-container">
            <div className="details-item">
              <p>Salary</p>
              <p className="details-value">{job.salary}</p>
            </div>
            <div className="details-item">
              <p>Location</p>
              <p className="details-value">{job.location}</p>
            </div>
            <div className="details-item">
              <p>Schedule</p>
              <p className="details-value">{dateAsDDMMYYYY(job.startSchedule)} - {dateAsDDMMYYYY(job.endSchedule)}</p>
            </div>
          </div>
        </div>
        {job.content}
      </div>
    )
  } else {
    return null
  }
}

export default JobDetails
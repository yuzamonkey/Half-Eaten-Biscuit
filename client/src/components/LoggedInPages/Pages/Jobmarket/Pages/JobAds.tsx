import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import '../Jobmarket.css'
import { ALL_JOBADS } from '../../../../../graphql/queries';
import { BlueButton, ContactButton, Loading } from '../../../../UtilityComponents/UtilityComponents';
import { dateAsDDMMYYYY } from '../../../../../utils/utilityFunctions';
import JobDetails from './JobDetails';

interface JobAd {
  postedOn: Date
}

const JobAds = () => {
  const result = useQuery(ALL_JOBADS, {
    onCompleted: (data) => {
      setOrderedQueries([...data.allJobAds].sort((q1, q2) => new Date(q2.postedOn).getTime() - new Date(q1.postedOn).getTime()))
    }
  })
  const orderOptions = ['Most recent post', 'Earliest post', 'Later starting date', 'Earlier starting date']
  const [orderedQueries, setOrderedQueries] = useState<JobAd[]>([])

  const [selectedJob, setSelectedJob] = useState<JobAd>()
  const [showJobInfo, setShowJobInfo] = useState(false)

  if (result.loading) {
    return (
      <div className="job-page">
        <Loading />
      </div>
    )
  }
  const handleMoreInfoClick = (q) => {
    //history.push(`/jobmarket/queries/${q.id}`)
    setSelectedJob(q)
    setShowJobInfo(true)
  }

  const jobads = result.data.allJobAds

  const handleSelectedOrderChange = (value) => {
    if (value === orderOptions[0]) {
      setOrderedQueries([...jobads].sort((q1, q2) => new Date(q2.postedOn).getTime() - new Date(q1.postedOn).getTime()))
    }
    else if (value === orderOptions[1]) {
      setOrderedQueries([...jobads].sort((q1, q2) => new Date(q1.postedOn).getTime() - new Date(q2.postedOn).getTime()))
    }
    else if (value === orderOptions[2]) {
      setOrderedQueries([...jobads].sort((q1, q2) => new Date(q2.startSchedule).getTime() - new Date(q1.startSchedule).getTime()))
    }
    else if (value === orderOptions[3]) {
      setOrderedQueries([...jobads].sort((q1, q2) => new Date(q1.startSchedule).getTime() - new Date(q2.startSchedule).getTime()))
    }
  }

  return (
    <div>
      <div className={showJobInfo ? "job-details-container active" : "job-details-container"}>
        <div className="job-details-content">
          <button onClick={() => setShowJobInfo(false)}>Back</button>
          <JobDetails job={selectedJob} />
        </div>
      </div>

      <div className={showJobInfo ? "jobads-container" : "jobads-container active"}>
        Filter by: skill, group, posted on date, schedule, location
        <label>Order by </label>
        <select onChange={(e) => handleSelectedOrderChange(e.target.value)}>
          {orderOptions.map(option => <option key={option}>{option}</option>)}
        </select>

        <ul className="job-cards">
          {orderedQueries.map((q: any) => {
            const contactText = `Contact ${q.postedBy.object.profile.firstName || q.postedBy.object.profile.name}`
            return (
              <div className="card" key={q.id}>
                <div className="general-info-container">
                  <div className="image-and-name-container">
                    <div className="image-container">
                      <img src={q.postedBy.object.profile.image} alt="profileimg" className="jobad-user-profile-image"></img>
                    </div>
                    <p><b>{q.postedBy.object.profile.name}</b> is looking for <br />
                      {q.wantedCategories.map(category => category.object.profession || category.object.name).join(', ')}
                    </p>
                  </div>
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
                      <p className="details-value">
                        {q.startSchedule === q.endSchedule
                          ? dateAsDDMMYYYY(q.startSchedule)
                          : `${dateAsDDMMYYYY(q.startSchedule)} - ${dateAsDDMMYYYY(q.endSchedule)}`
                        }
                      </p>
                    </div>
                  </div>
                </div>
                <div className="buttons-container">
                  <ContactButton handleClick={() => {}} key="123" />
                  <BlueButton text="More info" handleClick={() => handleMoreInfoClick(q)} />
                </div>
              </div>

            )
          })}
        </ul>
      </div>
    </div>
  )
};

export default JobAds;

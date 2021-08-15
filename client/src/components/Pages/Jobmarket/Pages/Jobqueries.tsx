import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import '../Jobmarket.css'
import { ALL_JOBQUERIES } from '../../../../graphql/queries';
import { Button, Loading } from '../../../UtilityComponents/UtilityComponents';
import { dateAsDDMMYYYY } from '../../../../utils/utilityFunctions';
import JobDetails from './JobDetails';

interface Jobquery {
  postedOn: Date
}

const Jobqueries = () => {
  const result = useQuery(ALL_JOBQUERIES, {
    onCompleted: (data) => {
      setOrderedQueries([...data.allJobqueries].sort((q1, q2) => new Date(q2.postedOn).getTime() - new Date(q1.postedOn).getTime()))
    }
  })
  const orderOptions = ['Most recent post', 'Earliest post', 'Later starting date', 'Earlier starting date']
  const [orderedQueries, setOrderedQueries] = useState<Jobquery[]>([])

  const [selectedJob, setSelectedJob] = useState<Jobquery>()
  const [showJobInfo, setShowJobInfo] = useState(false)

  if (result.loading) {
    return <Loading />
  }
  const handleMoreInfoClick = (q) => {
    //history.push(`/jobmarket/queries/${q.id}`)
    setSelectedJob(q)
    setShowJobInfo(true)
  }

  const jobqueries = result.data.allJobqueries

  const handleSelectedOrderChange = (value) => {
    if (value === orderOptions[0]) {
      setOrderedQueries([...jobqueries].sort((q1, q2) => new Date(q2.postedOn).getTime() - new Date(q1.postedOn).getTime()))
    }
    else if (value === orderOptions[1]) {
      setOrderedQueries([...jobqueries].sort((q1, q2) => new Date(q1.postedOn).getTime() - new Date(q2.postedOn).getTime()))
    }
    else if (value === orderOptions[2]) {
      setOrderedQueries([...jobqueries].sort((q1, q2) => new Date(q2.startSchedule).getTime() - new Date(q1.startSchedule).getTime()))
    }
    else if (value === orderOptions[3]) {
      setOrderedQueries([...jobqueries].sort((q1, q2) => new Date(q1.startSchedule).getTime() - new Date(q2.startSchedule).getTime()))
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

      <div className={showJobInfo ? "jobqueries-container" : "jobqueries-container active"}>
        Filter by: skill, group, posted on date, schedule, location
        <label>Order by </label>
        <select onChange={(e) => handleSelectedOrderChange(e.target.value)}>
          {orderOptions.map(option => <option key={option}>{option}</option>)}
        </select>

        <ul>
          {orderedQueries.map((q: any) => {
            const contactText = `Contact ${q.postedBy.object.profile.firstName || q.postedBy.object.profile.name}`
            return (
              <div className="card" key={q.id}>
                <div className="general-info-container">
                  <div className="image-and-name-container">
                    <div className="image-container">
                      <img src={q.postedBy.object.profile.image} alt="profileimg" className="jobquery-user-profile-image"></img>
                    </div>
                    <p><b>{q.postedBy.object.profile.name}</b> is looking for <br />
                      {q.wantedCategories.map(category => category.object.profession || category.object.name)}
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
                      <p className="details-value">{dateAsDDMMYYYY(q.startSchedule)} - {dateAsDDMMYYYY(q.endSchedule)}</p>
                    </div>
                  </div>
                </div>
                <div className="buttons-container">
                  <Button text={contactText} handleClick={() => console.log("CONTACT SOMEBODY")} />
                  <Button text="More info" handleClick={() => handleMoreInfoClick(q)} />
                </div>
              </div>

            )
          })}
        </ul>
      </div>
    </div>
  )
};

export default Jobqueries;

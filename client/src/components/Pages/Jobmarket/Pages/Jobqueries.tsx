import React from 'react';
import { useQuery } from '@apollo/client';

import '../Jobmarket.css'
import { ALL_JOBQUERIES } from '../../../../graphql/queries';
import { Button, Loading } from '../../../UtilityComponents/UtilityComponents';
import { useHistory } from 'react-router-dom';

const Jobqueries = () => {
  const history = useHistory()
  const result = useQuery(ALL_JOBQUERIES)

  if (result.loading) {
    return <Loading />
  }
  const handleMoreInfoPress = (q) => {
    history.push(`/jobmarket/queries/${q.id}`)
  }

  const jobqueries = result.data.allJobqueries

  return (
    <div>
      Filter by: skill, group, posted on date, schedule, location
      <ul>
        {jobqueries.map((q: any) => {
          const contactText = `Contact ${q.postedBy.object.username || q.postedBy.object.profile.name}`
          return (
            <div className="card" key={q.id}>
              <div className="general-info-container">
                <div className="image-and-name-container">
                  <div className="image-container">
                    <img src={q.postedBy.object.profile.image} alt="profileimg" className="jobquery-user-profile-image"></img>
                  </div>
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
                    <p className="details-value">{q.startSchedule.substring(0,10)} •••  {q.endSchedule.substring(0,10)}</p>
                  </div>
                </div>
              </div>
              <div className="buttons-container">
                <Button text={contactText} handleClick={() => console.log("CONTACT SOMEBODY")} />
                <Button text="More info" handleClick={() => handleMoreInfoPress(q)} />
              </div>
            </div>
          )
        })}
      </ul>
    </div>
  )
};

export default Jobqueries;

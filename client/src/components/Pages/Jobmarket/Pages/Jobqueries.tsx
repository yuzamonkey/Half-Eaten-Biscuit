import React from 'react';
import { useQuery } from '@apollo/client';

import '../Jobmarket.css'
import { ALL_JOBQUERIES } from '../../../../graphql/queries';
import { Button, Loading } from '../../../UtilityComponents/UtilityComponents';

const Jobqueries = () => {
  const result = useQuery(ALL_JOBQUERIES)

  if (result.loading) {
    return <Loading />
  }
  const handleButtonPress = () => {
    console.log("Button pressed")
  }

  return (
    <div>
      Filter by: skill, group, posted on date, schedule, location
      <ul>
        {result.data.allJobqueries.map((q: any) => {
          const contactText = `Contact ${q.postedBy.username}`
          return (
            // <div className="card"> <li key={q.content}>{q.postedBy.username}, {q.content}, {q.date}</li></div>
            <div className="card" key={q.id}>
              <div className="general-info-container">
                <div className="image-and-name-container">
                  <div className="image-container">
                    <img src={q.postedBy.profile.image} alt="profileimg" className="jobquery-user-profile-image"></img>
                  </div>
                  <p><b>{q.postedBy.username}</b> is looking for <br />
                    string ensemble</p>

                </div>
                {/* <p>{q.content}</p> */}
                <div className="details-container">
                  <div className="details-item">
                    <p>Salary</p>
                    <p className="details-value">250</p>
                  </div>
                  <div className="details-item">
                    <p>Location</p>
                    <p className="details-value">Helsinki</p>
                  </div>
                  <div className="details-item">
                    <p>Schedule</p>
                    <p className="details-value">16.8.2021</p>
                  </div>
                </div>
              </div>
              <div className="buttons-container">
                <Button text={contactText} handleClick={handleButtonPress} />
                <Button text="More info" handleClick={handleButtonPress} />
                {/* <button className="card-button jq-contact-button" onClick={handleButtonPress}>Contact {q.postedBy.username}</button>
                <button className="card-button more-info-button" onClick={handleButtonPress}>More info</button> */}
              </div>
            </div>
          )
        })}
      </ul>

    </div>

  )
};

export default Jobqueries;

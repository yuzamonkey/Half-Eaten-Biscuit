import React from 'react';
import { useQuery } from '@apollo/client';

import '../Jobmarket.css'
import { ALL_QUERIES } from '../../../../graphql/queries';
import { Button } from '../../../../utils/UtilityComponents/UtilityComponents';

const Jobqueries = () => {
  const result = useQuery(ALL_QUERIES)

  if (result.loading) {
    return <div>loading...</div>
  }
  const handleButtonPress = () => {
    console.log("Button pressed")
  }

  //console.log("RESULT QUERIES", result)

  return (
    <div>
      <ul>
        {result.data.allJobqueries.map((q: any) => {
          const contactText = `Contact ${q.user.username}`
          return (
            // <div className="card"> <li key={q.content}>{q.user.username}, {q.content}, {q.date}</li></div>
            <div className="card">
              <div className="general-info-container">
                <div className="image-and-name-container">
                  <div className="image-container">

                  </div>
                  <p><b>{q.user.username}</b> is looking for <br />
                    string ensemble</p>

                </div>
                <p>{q.content}</p>
                <div className="details-container">
                  <p>250</p>
                  <p>Helsinki</p>
                  <p>16.8.2021</p>

                </div>
              </div>
              <div className="buttons-container">
                <Button text={contactText} handleClick={handleButtonPress} />
                <Button text="More info" handleClick={handleButtonPress} />
                {/* <button className="card-button jq-contact-button" onClick={handleButtonPress}>Contact {q.user.username}</button>
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

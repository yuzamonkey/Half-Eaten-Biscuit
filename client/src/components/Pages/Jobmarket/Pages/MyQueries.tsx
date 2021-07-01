import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ME } from '../../../../graphql/queries';
import { Toggle } from '../../../../utils/UtilityComponents/UtilityComponents';

const MyQueries = () => {
  const result = useQuery(ME)

  const [visible, setVisible] = useState(false)
  console.log(visible)

  const handleToggleClick = (id) => {
    console.log("TOGGLE CLICKED", id)
    setVisible(!visible)
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  console.log("RESULT MY QUERIES \n", result)

  return (
    <div>
      <h3>My queries</h3>
      {result.data.me.jobQueries.map((q: any) => {
        return (
          <div>
            <Toggle state={visible} toggleClick={() => handleToggleClick(q.id)}/>
            <p key={q.id}>{q.content}</p>
          </div>
        )
      })}
    </div>
  )
};

export default MyQueries;
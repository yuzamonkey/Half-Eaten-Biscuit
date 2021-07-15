import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ME } from '../../../../graphql/queries';
import { Toggle } from '../../../../utils/UtilityComponents/UtilityComponents';

const MyQueries = () => {
  const result = useQuery(ME)

  const [visible, setVisible] = useState(false)

  const handleToggleClick = (id) => {
    console.log("TOGGLE CLICKED", id)
    setVisible(!visible)
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h3>My queries</h3>
      {result.data.me.jobQueries.map((q: any) => {
        return (
          <div key={q.id}>
            <Toggle state={visible} toggleClick={() => handleToggleClick(q.id)}/>
            <p key={q.id}>{q.content}</p>
          </div>
        )
      })}
    </div>
  )
};

export default MyQueries;
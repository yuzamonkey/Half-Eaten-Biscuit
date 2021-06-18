import React from 'react';
import { useQuery } from '@apollo/client';
import { ME } from '../../../../queries';

const MyQueries = () => {
  const result = useQuery(ME)

  if (result.loading) {
    return <div>loading...</div>
  }

  console.log("RESULT MY QUERIES \n", result)

  return (
    <div>
      <h3>My queries</h3>
      {result.data.me.jobQueries.map((q: any) => <p key={q.id}>{q.content}</p>)}
    </div>
  )
};

export default MyQueries;
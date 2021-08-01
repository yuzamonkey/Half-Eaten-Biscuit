import React from 'react';
import { useQuery } from '@apollo/client';
import { ME } from '../../../../graphql/queries';
import { Toggle, Loading } from '../../../UtilityComponents/UtilityComponents';

const MyQueries = () => {
  const result = useQuery(ME)

  //FIX!, find jobqueries based on sessionId, not me

  const handleToggleClick = (id) => {
    console.log("SET VISIBILITY OF", id)
  }

  if (result.loading) {
    return <Loading />
  }

  return (
    <div>
      <h3>My queries</h3>
      {result.data.me.jobQueries.map((q: any) => {
        return (
          <div key={q.id} className="card">
            <div>
            Visibility: <Toggle state={q.visible} toggleClick={() => handleToggleClick(q.id)}/>
            </div>
            <p key={q.id}>{q.content}</p>
          </div>
        )
      })}
    </div>
  )
};

export default MyQueries;
import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { JOBQUERIES_SENT_BY_SESSION_ID } from '../../../../graphql/queries';
import { Toggle, Loading } from '../../../UtilityComponents/UtilityComponents';
import { UserContext } from '../../../UtilityComponents/UserContext';

const MyQueries = () => {
  const userContext = useContext(UserContext)
  const result = useQuery(JOBQUERIES_SENT_BY_SESSION_ID, { variables: { id: userContext.sessionId } })

  const handleToggleClick = (id) => {
    console.log("SET VISIBILITY OF", id)
  }

  if (result.loading) {
    return <Loading />
  }
  
  return (
    <div>
      <h3>My queries</h3>
      {result.data.findUserOrGroup.jobQueries.map((q: any) => {
        return (
          <div key={q.id} className="card">
            <div>
              Visibility: <Toggle state={q.visible} toggleClick={() => handleToggleClick(q.id)} />
            </div>
            <p key={q.id}>{q.content}</p>
          </div>
        )
      })}
    </div>
  )
};

export default MyQueries;
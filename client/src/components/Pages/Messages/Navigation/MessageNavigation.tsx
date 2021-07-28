import React, { useContext } from 'react'
import { useQuery } from '@apollo/client';
import { NavLink } from "react-router-dom";
import { CONVERSATION_PARTICIPANTS_BY_SESSION_ID } from '../../../../graphql/queries';

import './MessageNavigation.css'
import { Loading, Searchbar } from '../../../UtilityComponents/UtilityComponents';
import { UserContext } from '../../../UtilityComponents/UserContext';

const MessageNavigation = ({ setShowContacts }: any) => {
  const userContext = useContext(UserContext)
  const participants = useQuery(CONVERSATION_PARTICIPANTS_BY_SESSION_ID, {
    variables: {
      id: userContext.sessionId
    }
  })

  if (participants.loading) {
    return <Loading />
  }

  const conversations = participants.data.findUserOrGroup.conversations

  return (
    <nav className="msg-navigation">
      <div className="msg-nav-container">
        <div className="messages-filter-container">
          <Searchbar />
        </div>
        <ul className="msg-nav-menu">
          {conversations.map(conversation => {
            const names = conversation.participants.map(participant => {
              return participant.object.kind === 'User'
                ? <p key={participant.object.id}>{participant.object.username}</p>
                : <p key={participant.object.id}>{participant.object.profile.name}</p>
            }
            )
            const linkTo = `/messages/${conversation.id}`
            return (
              <li className="msg-nav-item" key={conversation.id}>
                <NavLink exact to={linkTo} activeClassName="msg-active" className="msg-nav-links" onClick={() => setShowContacts(false)}>
                  {names}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default MessageNavigation;
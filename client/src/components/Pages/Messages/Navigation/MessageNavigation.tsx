import React, { useContext, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { NavLink } from "react-router-dom";
import { CONVERSATION_PARTICIPANTS_BY_SESSION_ID } from '../../../../graphql/queries';

import './MessageNavigation.css'
import { Loading, Searchbar } from '../../../UtilityComponents/UtilityComponents';
import { UserContext } from '../../../UtilityComponents/UserContext';
import { SET_CONVERSATION_AS_SEEN } from '../../../../graphql/mutations';

const MessageNavigation = ({ setShowContacts }: any) => {
  const [setConversationAsSeen] = useMutation(SET_CONVERSATION_AS_SEEN)
  const [searchInput, setSearchInput] = useState('')
  const userContext = useContext(UserContext)
  const participants = useQuery(CONVERSATION_PARTICIPANTS_BY_SESSION_ID, {
    variables: {
      id: userContext.sessionId
    }
  })

  if (participants.loading) {
    return <Loading />
  }

  const handleClick = (conversationId) => {
    setShowContacts(false)
    console.log("SOMETHING", conversationId)
    //set conversation as seen
    setConversationAsSeen({variables: {
      currentProfileId: userContext.sessionId,
      conversationId: conversationId
    }})
    //update cache
  }

  return (
    <nav className="msg-navigation">
      <div className="msg-nav-container">
        <div className="messages-filter-container">
          <Searchbar input={searchInput} setInput={setSearchInput} />
        </div>
        <ul className="msg-nav-menu">
          {participants.data?.findUserOrGroup.conversations.map(c => {
            const conversation = c.object
            const names = conversation.participants.map(participant => participant.object.profile.name).join(', ')
            const linkTo = `/messages/${conversation.id}`
            if (names.toLowerCase().includes(searchInput.toLowerCase())) {
              return (
                <li className="msg-nav-item" key={conversation.id}>
                  <NavLink exact to={linkTo} activeClassName="msg-active" className={c.hasUnreadMessages ? "msg-nav-links has-unread-messages" : "msg-nav-links"} onClick={() => handleClick(conversation.id)}>
                    {names}
                  </NavLink>
                </li>
              )
            } return null
          })}
        </ul>
      </div>
    </nav>
  )
}

export default MessageNavigation;
import React, { useContext, useState } from 'react'
import { useQuery } from '@apollo/client';
import { NavLink } from "react-router-dom";
import { CONVERSATION_PARTICIPANTS_BY_SESSION_ID } from '../../../../../graphql/queries';

import './MessageNavigation.css'
import { Loading, Searchbar, SmallProfileImage } from '../../../../UtilityComponents/UtilityComponents';
import { UserContext } from '../../../../UtilityComponents/UserContext';

const MessageNavigation = ({ setShowContacts }: any) => {
  const [searchInput, setSearchInput] = useState('')
  const userContext = useContext(UserContext)
  const participants = useQuery(CONVERSATION_PARTICIPANTS_BY_SESSION_ID, {
    variables: {
      id: userContext.sessionId
    }
  })

  if (participants.loading) {
    return (
      <nav className="msg-navigation"><Loading /></nav>
    )
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
                <li className={c.hasUnreadMessages ? "msg-nav-item has-unread-messages" : "msg-nav-item"} key={conversation.id}>
                  <NavLink exact to={linkTo} activeClassName="msg-active" className="msg-nav-links" onClick={() => setShowContacts(false)}>
                    {conversation.participants.map(participant => {
                      // console.log("PARTICIPANT", participant)
                      return (
                        <div className="msg-nav-conversation-container" id={participant.object.id}>
                          <div className="msg-nav-images-container">
                            <SmallProfileImage image={participant.object.profile.image} />
                          </div>
                          <div className="msg-nav-name-container">
                            {participant.object.profile.name}
                          </div>
                          <div className="msg-nav-filler-div"/>
                        </div>
                      )
                    })}
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
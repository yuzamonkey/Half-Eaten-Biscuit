import React from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import './Conversation.css'
import { FIND_CONVERSATION, MY_ID } from '../../../../queries';

const Conversation = () => {
  const { id }: any = useParams();
  const conversationResult = useQuery(FIND_CONVERSATION, {
    variables: { id }
  })

  const myIdResult = useQuery(MY_ID)

  if (conversationResult.loading || myIdResult.loading) {
    return <div>Loading...</div>
  }
  
  const users = conversationResult.data.findConversation.users
  const messages = conversationResult.data.findConversation.messages

  const myId = myIdResult.data.me.id

  return (
    <div className="conversation-container">
      <div className="conversation-info">
        <h2>Conversation {id}</h2>
        <p>Participants: {users.map(p => p.username + ", ")}</p>
      </div>
      <div className="conversation-content">
        {messages.map(message => {
          console.log("MESSAGE", message)
          return (
            message.sender.id === myId
              ? <div className="message-container user-sent">
                {message.body}
              </div>
              : <div className="message-container">
                {message.body}
              </div>
          )
        })}
      </div>
      <div className="conversation-input-container">

        <input type="text"></input>
        <button>Send</button>
      </div>
    </div >
  )
}

export default Conversation


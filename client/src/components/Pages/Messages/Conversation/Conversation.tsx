import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import './Conversation.css'
import { FIND_CONVERSATION, MY_ID } from '../../../../graphql/queries';
import { SEND_MESSAGE } from '../../../../graphql/mutations';

const Conversation = ({ setShowContacts }: any) => {
  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onError: (error) => {
      console.log("ERROR ON SENDING MESSAGE")
    }
  })
  const { id }: any = useParams();
  const conversationResult = useQuery(FIND_CONVERSATION, {
    variables: { id }
  })
  const myIdResult = useQuery(MY_ID)

  const [messageInput, setMessageInput] = useState('')

  if (conversationResult.loading || myIdResult.loading) {
    return <div>Loading...</div>
  }

  const users = conversationResult.data.findConversation.users
  const messages = conversationResult.data.findConversation.messages
  const conversationId = conversationResult.data.findConversation.id

  const myId = myIdResult.data.me.id

  const handleSendMessage = (event) => {
    event.preventDefault()
    console.log("HANDLE SEND MESSAGE CALLED", messageInput)
    sendMessage({ variables: { id: conversationId, body: messageInput } })
    setMessageInput('')
  }

  return (
    <div className="conversation-container">
      <div className="conversation-info">
        {users.map(p => p.username + ", ")}
        <div onClick={() => setShowContacts(true)} className="show-contacts-toggle"><i className={"fas fa-arrow-down"}></i></div>
      </div>
      <h2>Conversation {id}</h2>
      <div className="conversation-content">
        {messages.map(message => {
          return (
            message.sender.id === myId
              ? <div className="message-container user-sent" key={message.id}>
                {message.body}
              </div>
              : <div className="message-container" key={message.id}>
                {message.body}
              </div>
          )
        })}
      </div>
      <div className="conversation-input-container">
        <form>
          <input type="text" onChange={e => setMessageInput(e.target.value)} value={messageInput}></input>
          <button onClick={handleSendMessage}>Send</button>
        </form>
      </div>
    </div >
  )
}

export default Conversation


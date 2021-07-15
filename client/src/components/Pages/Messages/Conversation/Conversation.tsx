import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useApolloClient, useSubscription } from '@apollo/client';

import './Conversation.css'
import { FIND_CONVERSATION, MY_ID } from '../../../../graphql/queries';
import { SEND_MESSAGE } from '../../../../graphql/mutations';
import { MESSAGE_ADDED } from '../../../../graphql/subscriptions';

const Conversation = ({ setShowContacts }: any) => {
  const { id }: any = useParams();
  const client = useApolloClient()

  const conversationResult = useQuery(FIND_CONVERSATION, {
    variables: { id }
  })

  const updateCacheWith = async (addedMessage) => {
    const includedIn = (set, object) => {
      const isIncluded = set.map(message => message.id).includes(object.id)
      return isIncluded
    }

    const dataInStore = await client.readQuery({ 
      query: FIND_CONVERSATION, 
      variables: { id }
    })
    console.log("DATA IN STORE", dataInStore)
    if (dataInStore === null) {
      console.log("NO DATA IN STORE")
      // BUG! Continue from here. After refreshing the page, dataInStore returns null even if the data is in the cache.
    }
    else if (!includedIn(dataInStore.findConversation.messages, addedMessage)) {
      client.writeQuery({
        query: FIND_CONVERSATION,
        variables: { id },
        data: { findConversation: dataInStore.findConversation.messages.concat(addedMessage) }
      })
    }
  }

  useSubscription(MESSAGE_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedMessage = subscriptionData.data
      updateCacheWith(addedMessage)
    }
  })

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onError: (error) => {
      console.log("ERROR ON SENDING MESSAGE", error)
    },
    // update: (store, response) => {
    //   updateCacheWith(response.data.sendMessage)
    // }
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

  const handleSendMessage = async (event) => {
    event.preventDefault()
    await sendMessage({ variables: { id: conversationId, body: messageInput } })
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


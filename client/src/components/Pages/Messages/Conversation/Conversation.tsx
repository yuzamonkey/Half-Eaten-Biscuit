import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useApolloClient, useSubscription } from '@apollo/client';

import './Conversation.css'
import { FIND_CONVERSATION } from '../../../../graphql/queries';
import { SEND_MESSAGE } from '../../../../graphql/mutations';
import { MESSAGE_ADDED } from '../../../../graphql/subscriptions';
import { UserContext } from '../../../UtilityComponents/UserContext';
import { Loading } from '../../../UtilityComponents/UtilityComponents';

const Conversation = ({ setShowContacts }: any) => {
  const userContext = useContext(UserContext)
  const { id }: any = useParams();
  const client = useApolloClient()

  const conversationResult = useQuery(FIND_CONVERSATION, {
    variables: { id },
    onCompleted: () => scrollToBottom()
  })

  // useEffect(() => {
  //   const element = document.getElementById('conversation-content')
  //   element?.scrollTo({
  //     top: element.scrollHeight,
  //     behavior: 'smooth'
  //   })
  // }, [conversationResult.loading])

  const scrollToBottom = () => {
    const element = document.getElementById('conversation-content')
    element?.scrollTo({
      top: element.scrollHeight,
      behavior: 'smooth'
    })
  }

  const updateCacheWith = async (addedMessage) => {
    const includedIn = (set, object) => {
      const isIncluded = set.map(message => message.id).includes(object.id)
      return isIncluded
    }

    const dataInStore = await client.readQuery({
      query: FIND_CONVERSATION,
      variables: { id }
    })
    //console.log("DATA IN STORE", dataInStore)
    if (dataInStore === null) {
      console.log("NO DATA IN STORE")
      // BUG! Continue from here. After refreshing the page, dataInStore returns null even if the data is in the cache.
      //Note, check useQuery documentation. There are some cache options
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
    onSubscriptionData: async ({ subscriptionData }) => {
      const addedMessage = subscriptionData.data
      updateCacheWith(addedMessage)
    },
  })

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onError: (error) => {
      console.log("ERROR ON SENDING MESSAGE", error)
    }
    // update: (store, response) => {
    //   updateCacheWith(response.data.sendMessage)
    // }
  })

  const [messageInput, setMessageInput] = useState('')

  if (conversationResult.loading) {
    return <Loading />
  }

  const participants = conversationResult.data.findConversation.participants
  const messages = conversationResult.data.findConversation.messages
  const conversationId = conversationResult.data.findConversation.id

  const handleSendMessage = async (event) => {
    event.preventDefault()
    await sendMessage({
      variables: {
        conversationId: conversationId,
        senderId: userContext.sessionId,
        body: messageInput
      }
    })
    setMessageInput('')
  }

  return (
    <div className="conversation-container">
      <div className="conversation-info">
        <div className="conversation-usernames">
          {participants.map(p => {
            return p.object.id === userContext.sessionId
              ? <b key={p.object.id}>Me • </b>
              : <b key={p.object.id}>{p.object.username || p.object.profile.name} • </b>
          }
          )}
        </div>
        <div onClick={() => setShowContacts(true)} className="show-contacts-toggle"><i className={"fas fa-arrow-down"}></i></div>
      </div>
      <div id='conversation-content' className="conversation-content">
        {messages.map(message => {
          return (
            <div
              className={message.sender.object.id === userContext.sessionId ? "message-container user-sent" : "message-container"}
              key={message.id}>
              <img src={message.sender.object.profile.image} alt="profileimg" className="message-profile-image"></img>
              {message.body}
            </div>
          )
        })}
      </div>
      <div className="conversation-input-container">
        <form className="conversation-input-form">
          <input className="conversation-text-input" type="text" onChange={e => setMessageInput(e.target.value)} value={messageInput}></input>
          <button className="conversation-send-button" onClick={handleSendMessage}>➤</button>
        </form>
      </div>
    </div >
  )
}

export default Conversation


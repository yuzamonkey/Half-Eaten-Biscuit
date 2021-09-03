import React, { useContext, useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useQuery, useMutation, useSubscription } from '@apollo/client';

import './Conversation.css'
import { FIND_CONVERSATION } from '../../../../../graphql/queries';
import { SEND_MESSAGE, SET_CONVERSATION_AS_SEEN } from '../../../../../graphql/mutations';
import { UserContext } from '../../../../UtilityComponents/UserContext';
import { Loading, SmallProfileImage } from '../../../../UtilityComponents/UtilityComponents';
import { CONVERSATION_UPDATE } from '../../../../../graphql/subscriptions';
import NoConversationSelected from './NoConversationSelected';

const Conversation = ({ setShowContacts }: any) => {
  const history = useHistory()
  const userContext = useContext(UserContext)
  const { id }: any = useParams();
  const conversationResult = useQuery(FIND_CONVERSATION, { variables: { id } })
  const [setConversationAsSeen] = useMutation(SET_CONVERSATION_AS_SEEN)

  const [messageInput, setMessageInput] = useState('')

  useEffect(() => {
    handleSetConversationAsSeen()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationResult.data])

  const handleSetConversationAsSeen = () => {
    if (conversationResult.data) {
      if (!conversationResult.data.findConversation.participants.map(p => p.object.id).includes(userContext.sessionId)) {
        console.log("NOT IN THE CONVERSATION")
      } else {
        setConversationAsSeen({
          variables: {
            currentProfileId: userContext.sessionId,
            conversationId: id
          }
        })
      }
      scrollToBottom()
    }
  }

  const scrollToBottom = () => {
    const element = document.getElementById('conversation-content')
    element?.scrollTo({
      top: element.scrollHeight,
      behavior: 'smooth'
    })
  }

  useSubscription(CONVERSATION_UPDATE, {
    variables: {
      conversationId: id
    },
    onSubscriptionData: async ({ subscriptionData }) => {
      console.log("CONVERSATION UPDATE", id)
      conversationResult.refetch()
    },
  })

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onError: (error) => {
      console.log("ERROR ON SENDING MESSAGE", error)
    }
  })

  if (conversationResult.loading) {
    return (
      <div className="conversation-container">
        <Loading />
      </div>
    )
  }

  if (!conversationResult.data) {
    return <NoConversationSelected setShowContacts={setShowContacts} text="Conversation not found"/>
  }

  const participants = conversationResult.data.findConversation.participants

  if (!participants.map(p => p.object.id).includes(userContext.sessionId)) {
    return <NoConversationSelected setShowContacts={setShowContacts} text="Select a conversation"/>
  }

  const messages = conversationResult.data.findConversation.messages
  const conversationId = conversationResult.data.findConversation.id

  const handleSendMessage = async (event) => {
    event.preventDefault()
    if (messageInput !== '') {
      sendMessage({
        variables: {
          conversationId: conversationId,
          senderId: userContext.sessionId,
          body: messageInput
        }
      })
      setMessageInput('')
    }
  }

  return (
    <div className="conversation-container">
      <div className="conversation-info">
        <div className="conversation-participants-container">
          {participants.map(p => {
            return (
              <div key={p.object.id} className="conversation-participant" onClick={() => history.push(`/profiles/${p.object.id}`)}>
                <SmallProfileImage image={p.object.profile.image} />
                &nbsp;
                <b>{p.object.profile.firstName || p.object.profile.name}</b>
              </div>
            )
          })}
        </div>
        <div onClick={() => setShowContacts(true)} className="show-contacts-toggle"><i className={"fas fa-arrow-down"}></i></div>
      </div>
      <div id='conversation-content' className="conversation-content">
        {messages.map(message => {
          return (
            message.sender.object.id === userContext.sessionId
              ? <div
                className="message-container user-sent"
                key={message.id}>
                {message.body}
                <SmallProfileImage image={message.sender.object.profile.image} />
              </div>
              :
              <div
                className="message-container"
                key={message.id}>
                <SmallProfileImage image={message.sender.object.profile.image} />
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




  // const updateCacheWith = async (addedMessage) => {
  //   const includedIn = (set, object) => {
  //     const isIncluded = set.map(message => message.id).includes(object.id)
  //     return isIncluded
  //   }

  //   const dataInStore = await client.readQuery({
  //     query: FIND_CONVERSATION,
  //     variables: { id }
  //   })
  //   //console.log("DATA IN STORE", dataInStore)
  //   if (dataInStore === null) {
  //     console.log("NO DATA IN STORE")
  //     // BUG! Continue from here. After refreshing the page, dataInStore returns null even if the data is in the cache.
  //     //Note, check useQuery documentation. There are some cache options
  //     // Now the bug seems to have disappeared 2.8.2021
  //     // But it sometimes occurs, so fix later 26.8.2021
  //   }
  //   else if (!includedIn(dataInStore.findConversation.messages, addedMessage)) {
  //     console.log("LENGTH NOW", dataInStore.findConversation.messages.length)
  //     client.writeQuery({
  //       query: FIND_CONVERSATION,
  //       variables: { id },
  //       data: { findConversation: dataInStore.findConversation.messages.concat(addedMessage) }
  //     })
  //     setNumberOfMessages(numberOfMessages + 1)
  //   }
  // }
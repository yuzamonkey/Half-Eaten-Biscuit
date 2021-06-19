import React from 'react'
import { useParams } from 'react-router-dom';

import './Conversation.css'

const conversation1 = {
  users: [
    {
      id: 1,
      name: "Mike Mikkelson"
    },
    {
      id: 2,
      name: "John Doe"
    }
  ],
  messages: [
    {
      sender_id: 2,
      content: "Hey Mike, I was interested to hear more about the thing! Could you send me some more info?"
    },
    {
      sender_id: 1,
      content: "Yeah sure! The thing will happen next Tuesday. See you there!"
    },
    {
      sender_id: 2,
      content: "Wait what? 😅"
    },
    {
      sender_id: 2,
      content: "Where?"
    },
    {
      sender_id: 1,
      content: "The address is Postmanpatstreet 42"
    },
    {
      sender_id: 1,
      content: "It was in the info 😁"
    },
    {
      sender_id: 2,
      content: "Aight, sorry for not paying attention. Sounds good though, see you!"
    },
  ]
}

const conversation2 = {
  users: [
    {
      id: 1,
      name: "Mike Mikkelson"
    },
    {
      id: 3,
      name: "Claus Clauson"
    },
    {
      id: 4,
      name: "Bob Bobbanson"
    }
  ],
  messages: [
    {
      sender_id: 3,
      content: "Hey Mike, have you found players"
    },
    {
      sender_id: 1,
      content: "Yeah, this John guy (John Doe) seems pretty good"
    },
    {
      sender_id: 4,
      content: "Nice, I know the guy. He used to play with us"
    },
    {
      sender_id: 1,
      content: "Got to ask, is he worth to take a chance on him"
    },
    {
      sender_id: 4,
      content: "Absolutely"
    },
    {
      sender_id: 4,
      content: "Awesome guy, even better player"
    },
    {
      sender_id: 1,
      content: "I feel way more relaxed already"
    },
    {
      sender_id: 3,
      content: "😄"
    },
  ]
}

const Conversation = () => {
  const { id }: any = useParams();
  //get conversation by id

  const userId = 1

  const participants = conversation2.users

  return (
    <div className="conversation-container">
      <div className="conversation-info">
        <h2>Conversation {id}</h2>
        <p>Participants: {participants.map(p => p.id !== userId ? p.name + ", " : "You, ")}</p>
      </div>
      <div className="conversation-content">
        {conversation2.messages.map(message => {
          return (
            message.sender_id === userId
              ? <div className="message-container user-sent">
                {message.content}
              </div>
              : <div className="message-container">
                {message.content}
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


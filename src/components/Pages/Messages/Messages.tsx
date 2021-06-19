import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MessageNavigation from './Navigation/MessageNavigation'
import Conversation from './Conversation/Conversation';
import './Messages.css'

const conversationsData = [
  {
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
        content: "Aight, sorry for not paying attention. Sound good though, see you!"
      },
    ]
  },
  {
    users: [
      {
        id: 1,
        name: "Mike Mikkelson"
      },
      {
        id: 3,
        name: "Bob Bobbanson"
      }
    ],
    messages: [
      {
        sender_id: 3,
        content: "Hey Mike, I'm Bob"
      },
      {
        sender_id: 1,
        content: "Hi Bob, I'm Mike"
      },
    ]
  },
]


const Messages = () => {
  return (
    <div className="messages-container">
      <Router>
        <div className="msg-contacts-container">
          <MessageNavigation />
        </div>
        <div className="msg-conversation-container">
          <Switch>
              <Route path="/messages/:id" component={Conversation} />
            </Switch>

        </div>
      </Router>
    </div>
  )
}


export default Messages
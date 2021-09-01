import React, { useState } from 'react';
import { Switch, Route } from "react-router-dom";

import MessageNavigation from './Navigation/MessageNavigation'
import Conversation from './Conversation/Conversation';
import './Messages.css'
import NoConversationSelected from './Conversation/NoConversationSelected';


const Messages = () => {
  const [showContacts, setShowContacts] = useState(false)

  return (
    <div className="messages-container">
        <div className={showContacts ? "msg-contacts-container active": "msg-contacts-container"}>
          <MessageNavigation setShowContacts={setShowContacts} />
        </div>
        <div className="msg-conversation-container">
          <Switch>
            <Route path="/messages/:id" component={() => <Conversation setShowContacts={setShowContacts} />} />
            <Route path="/messages/" component={() => <NoConversationSelected setShowContacts={setShowContacts} text="Select a conversation"/>} />
          </Switch>
        </div>
    </div>
  )
}


export default Messages
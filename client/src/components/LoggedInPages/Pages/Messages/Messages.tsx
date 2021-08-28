import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MessageNavigation from './Navigation/MessageNavigation'
import Conversation from './Conversation/Conversation';
import './Messages.css'


const Messages = () => {
  const [showContacts, setShowContacts] = useState(true)

  return (
    <div className="messages-container">
      <Router>
        <div className={showContacts ? "msg-contacts-container active": "msg-contacts-container"}>
          <MessageNavigation setShowContacts={setShowContacts} />
        </div>
        <div className="msg-conversation-container">
          <Switch>
            <Route path="/messages/:id" component={() => <Conversation setShowContacts={setShowContacts} />} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}


export default Messages
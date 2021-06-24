import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MessageNavigation from './Navigation/MessageNavigation'
import Conversation from './Conversation/Conversation';
import './Messages.css'


const Messages = () => {
  return (
    <div className="messages-container">
      <Router>
        <div className="msg-contacts-container">
          <MessageNavigation/>
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
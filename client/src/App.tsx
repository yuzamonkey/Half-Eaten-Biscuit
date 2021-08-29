import React, { useState } from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { MY_ID, MY_USER_AND_GROUP_IDS } from "./graphql/queries";

import './App.css';
import { SESSION_TOKEN, SIGN_IN_TOKEN } from "./utils/constants";
import { UserContext } from "./components/UtilityComponents/UserContext";
import ErrorBoundary from "./components/UtilityComponents/ErrorBoundary";
import LoggedInView from "./components/LoggedInPages/LoggedInView"
import LoggedOutView from "./components/LoggedOutPages/LoggedOutView";
import { Loading } from "./components/UtilityComponents/UtilityComponents";


const App = () => {
  const myId = useQuery(MY_ID)
  const myUserAndGroupIds = useQuery(MY_USER_AND_GROUP_IDS, { 
    onCompleted: (data) => {
      const myId = data.me.id
      const groupIds = data.me.groups.map(g => g.id)
      const all = groupIds.concat(myId)
      setUserAndGroupIds(all)
    }
  })

  const localStorageToken = localStorage.getItem(SIGN_IN_TOKEN)
  const sessionStorageToken = sessionStorage.getItem(SESSION_TOKEN)

  const [token, setToken] = useState(localStorageToken);
  const [sessionId, setSessionId] = useState(sessionStorageToken)
  const [userAndGroupIds, setUserAndGroupIds] = useState<string[]>([])

  if (myId.loading || myUserAndGroupIds.loading) {
    return <Loading />
  }

  if (token && !sessionId) {
    const id = myId.data.me.id
    setSessionId(id)
    sessionStorage.setItem(SESSION_TOKEN, id)
  }

  //VALIDATE SESSION STORAGE TOKEN

  return (
    <div className="app-container">
      {process.env.NODE_ENV !== 'development' &&
        <div className="production-notice-container">
          In development
        </div>
      }
      <ErrorBoundary>
        <Router>
          <UserContext.Provider value={{ token, setToken, sessionId, setSessionId, userAndGroupIds, setUserAndGroupIds }}>
            {token ? <LoggedInView /> : <LoggedOutView />}
          </UserContext.Provider>
        </Router>
      </ErrorBoundary>
    </div>
  );

}

export default App;

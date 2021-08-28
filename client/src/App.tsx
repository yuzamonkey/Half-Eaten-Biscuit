import React, { useState } from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { MY_ID } from "./graphql/queries";

import './App.css';
import { SESSION_TOKEN, SIGN_IN_TOKEN } from "./utils/constants";
import { UserContext } from "./components/UtilityComponents/UserContext";
import ErrorBoundary from "./components/UtilityComponents/ErrorBoundary";
import LoggedInView from "./components/LoggedInPages/LoggedInView"
import LoggedOutView from "./components/LoggedOutPages/LoggedOutView";
import { Loading } from "./components/UtilityComponents/UtilityComponents";


const App = () => {
  const result = useQuery(MY_ID)

  const localStorageToken = localStorage.getItem(SIGN_IN_TOKEN)
  const sessionStorageToken = sessionStorage.getItem(SESSION_TOKEN)

  const [token, setToken] = useState(localStorageToken);
  const [sessionId, setSessionId] = useState(sessionStorageToken)

  if (result.loading) {
    return <Loading />
  }

  if (token && !sessionId) {
    const id = result.data.me.id
    setSessionId(id)
    sessionStorage.setItem(SESSION_TOKEN, id)
  }

  return (
    <div className="app-container">
      {process.env.NODE_ENV !== 'development' &&
        <div className="production-notice-container">
          In development
        </div>
      }
      <ErrorBoundary>
        <Router>
          <UserContext.Provider value={{ token, setToken, sessionId, setSessionId }}>
            {token ? <LoggedInView /> : <LoggedOutView />}
          </UserContext.Provider>
        </Router>
      </ErrorBoundary>
    </div>
  );

}

export default App;

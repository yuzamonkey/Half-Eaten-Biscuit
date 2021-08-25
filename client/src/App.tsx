import React, { useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Messages from "./components/Pages/Messages/Messages";
import Jobmarket from "./components/Pages/Jobmarket/Jobmarket";
import Profiles from "./components/Pages/Profiles/Profiles";
import SignIn from "./components/Pages/Registrations/SignIn";
import SignUp from "./components/Pages/Registrations/SignUp";
import Home from "./components/Pages/Home/Home";
import Welcome from "./components/Pages/Welcome/Welcome";
import Settings from "./components/Pages/Settings/Settings";
import CreateGroup from "./components/Pages/Profiles/CreateGroup/CreateGroup";
import Profile from "./components/Pages/Profiles/Profile/Profile";
import CreateProfile from "./components/Pages/Profiles/CreateProfile/CreateProfile";

import './App.css';
import { SESSION_TOKEN, SIGN_IN_TOKEN } from "./utils/constants";

import { UserContext } from "./components/UtilityComponents/UserContext";
import ErrorBoundary from "./components/UtilityComponents/ErrorBoundary";
import ErrorPage from "./components/Pages/ErrorPage";
import { useQuery } from "@apollo/client";
import { MY_ID } from "./graphql/queries";


const App = () => {
  const result = useQuery(MY_ID)

  const localStorageToken = localStorage.getItem(SIGN_IN_TOKEN)
  const sessionStorageToken = sessionStorage.getItem(SESSION_TOKEN)

  const [token, setToken] = useState(localStorageToken);
  const [sessionId, setSessionId] = useState(sessionStorageToken)

  if (result.loading) {
    return <span />
  }

  if (token && !sessionId) {
    const id = result.data.me.id
    setSessionId(id)
    sessionStorage.setItem(SESSION_TOKEN, id)
  }

  return (
    <div className="app-container">
      <ErrorBoundary>
        <Router>
          {process.env.NODE_ENV !== 'development' &&
            <div className="production-notice-container">
              In development
            </div>
          }
          <UserContext.Provider value={{ token, setToken, sessionId, setSessionId }}>
            {!token
              ? <Switch>
                <Route path="/signin" component={() => <SignIn />} />
                <Route path="/signup" component={() => <SignUp />} />
                <Route path="/" component={Home} />
              </Switch>
              :
              <>
                <Navbar />
                <div className="pages">
                  <Switch>
                    <Route path="/messages" component={Messages} />
                    <Route path="/jobmarket" component={Jobmarket} />
                    <Route path="/profiles/:id" component={Profile} />
                    <Route path="/profiles" component={Profiles} />
                    <Route path="/settings" component={Settings} />
                    <Route path="/creategroup" component={CreateGroup} />
                    <Route path="/createprofile" component={CreateProfile} />
                    <Route path="/:invalidroute" component={ErrorPage} />
                    <Route exact path="/" component={Welcome} />
                  </Switch>
                </div>
              </>
            }
          </UserContext.Provider>
        </Router>
      </ErrorBoundary>
    </div>
  );

}

export default App;

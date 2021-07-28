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
import NewGroup from "./components/Pages/Profiles/NewGroup";
import Profile from "./components/Pages/Profiles/Profile/Profile";
import CreateProfile from "./components/Pages/Profiles/CreateProfile/CreateProfile";

import './App.css';
import { SESSION_TOKEN, SIGN_IN_TOKEN } from "./utils/constants";

import { UserContext } from "./components/UtilityComponents/UserContext";


const App = () => {
  const localStorageItem = localStorage.getItem(SIGN_IN_TOKEN)
  const [id, setId] = useState('')
  const [token, setToken] = useState(localStorageItem);
  const [sessionId, setSessionId] = useState(sessionStorage.getItem(SESSION_TOKEN))

  return (
    <Router>
      {process.env.NODE_ENV !== 'development' &&
        <div className="production-notice-container">
          In development
        </div>
      }
      <UserContext.Provider value={{ id, setId, token, setToken, sessionId, setSessionId }}>
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
                <Route path="/newgroup" component={NewGroup} />
                <Route path="/createprofile" component={CreateProfile} />
                <Route path="/" component={Welcome} />
              </Switch>
            </div>
          </>
        }
      </UserContext.Provider>
    </Router>
  );

}

export default App;

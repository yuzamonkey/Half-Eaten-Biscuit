import React, { useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useApolloClient } from "@apollo/client";

import Navbar from "./components/Navbar/Navbar";
import Messages from "./components/Pages/Messages/Messages";
import Jobmarket from "./components/Pages/Jobmarket/Jobmarket";
import Profiles from "./components/Pages/Profiles/Profiles";
import SignIn from "./components/Pages/Registrations/SignIn";
import SignUp from "./components/Pages/Registrations/SignUp";
import Home from "./components/Pages/Home/Home";
import Welcome from "./components/Welcome/Welcome";
import Settings from "./components/Pages/Settings/Settings";

import './App.css';
import { TOKEN_NAME } from "./constants";
import Profile from "./components/Pages/Profiles/Profile/Profile";

const App = () => {
  const localStorageItem = localStorage.getItem(TOKEN_NAME)
  const [token, setToken] = useState(localStorageItem);
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <Router>
      {!token
        ? <Switch>
          <Route path="/signin" component={() => <SignIn setToken={setToken} />} />
          <Route path="/signup" component={() => <SignUp/>} />
          <Route path="/" component={Home} />
        </Switch>
        :
        <>
          <Navbar logout={logout}/>

          <div className="pages">
            <Switch>
              <Route path="/messages" component={Messages} />
              <Route path="/jobmarket" component={Jobmarket} />
              <Route path="/profiles" component={Profiles} />
              <Route path="/profile/:id" component={Profile} />
              <Route path="/settings" component={Settings} />
              <Route path="/" component={() => <Welcome logout={logout}/>} />
            </Switch>
          </div>
        </>
      }
    </Router>
  );

}

export default App;

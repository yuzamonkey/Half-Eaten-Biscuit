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

import './App.css';
import { SIGN_IN_TOKEN } from "./utils/constants";
import Profile from "./components/Pages/Profiles/Profile/Profile";
import ProfileEdit from "./components/Pages/Profiles/ProfileEdit/ProfileEdit";

const App = () => {
  const localStorageItem = localStorage.getItem(SIGN_IN_TOKEN)
  const [token, setToken] = useState(localStorageItem);

  return (
    <Router>
      {process.env.NODE_ENV !== 'development' && 
      <div className="production-notice-container">
        In development
      </div>
      }
      {!token
        ? <Switch>
          <Route path="/signin" component={() => <SignIn setToken={setToken} />} />
          <Route path="/signup" component={() => <SignUp/>} />
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
              <Route path="/editprofile" component={ProfileEdit} />
              <Route path="/" component={Welcome} />
            </Switch>
          </div>
        </>
      }
    </Router>
  );

}

export default App;

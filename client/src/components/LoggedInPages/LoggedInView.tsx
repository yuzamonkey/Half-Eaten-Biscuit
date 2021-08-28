import { Route, Switch } from "react-router-dom"
import Navbar from "./Navbar/Navbar"
import ErrorPage from "./Pages/ErrorPage"
import Jobmarket from "./Pages/Jobmarket/Jobmarket"
import Messages from "./Pages/Messages/Messages"
import CreateGroup from "./Pages/Profiles/CreateGroup/CreateGroup"
import CreateProfile from "./Pages/Profiles/CreateProfile/CreateProfile"
import Profile from "./Pages/Profiles/Profile/Profile"
import Profiles from "./Pages/Profiles/Profiles"
import Settings from "./Pages/Settings/Settings"
import Welcome from "./Pages/Welcome/Welcome"

const LoggedInView = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/messages" component={Messages} />
        <Route path="/jobmarket" component={Jobmarket} />
        <Route path="/profiles" component={Profiles} />
        <Route path="/profiles/:id" component={Profile} />
        <Route path="/settings" component={Settings} />
        <Route path="/creategroup" component={CreateGroup} />
        <Route path="/createprofile" component={CreateProfile} />
        <Route path="/:invalidroute" component={ErrorPage} />
        <Route exact path="/" component={Welcome} />
      </Switch>
    </div >
  )
}

export default LoggedInView
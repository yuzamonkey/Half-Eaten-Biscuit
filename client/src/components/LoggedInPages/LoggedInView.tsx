import { useQuery } from "@apollo/client"
import { useContext, useState } from "react"
import { Route, Switch } from "react-router-dom"

import { MY_USER_AND_GROUP_IDS } from "../../graphql/queries"
import { SESSION_TOKEN } from "../../utils/constants"
import { UserContext } from "../UtilityComponents/UserContext"
import { Loading } from "../UtilityComponents/UtilityComponents"
import Navbar from "./Navbar/Navbar"
import Jobmarket from "./Pages/Jobmarket/Jobmarket"
import Messages from "./Pages/Messages/Messages"
import CreateGroup from "./Pages/Profiles/CreateGroup/CreateGroup"
import CreateProfile from "./Pages/Profiles/CreateProfile/CreateProfile"
import Profile from "./Pages/Profiles/Profile/Profile"
import Profiles from "./Pages/Profiles/Profiles"
import Settings from "./Pages/Settings/Settings"
import Welcome from "./Pages/Welcome/Welcome"

const LoggedInView = () => {
  const userContext = useContext(UserContext)
  const [validationCompleted, setValidationCompleted] = useState(false)
  useQuery(MY_USER_AND_GROUP_IDS, {
    onCompleted: (data) => {
      const myId = data.me.id
      const groupIds = data.me.groups.map(g => g.id)
      const all = groupIds.concat(myId)
      userContext.setUserAndGroupIds(all)
      if (!all.includes(userContext.sessionId)) {
        console.log("WRONG ID")
        sessionStorage.setItem(SESSION_TOKEN, myId)
        userContext.setSessionId(myId)
      } 
      setValidationCompleted(true)
    }
  })

  if (!validationCompleted) {
    return <Loading />
  }

  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/messages" component={Messages} />
        <Route path="/jobmarket" component={Jobmarket} />
        <Route path="/profiles/:id" component={Profile} />
        <Route path="/profiles" component={Profiles} />
        <Route path="/settings" component={Settings} />
        <Route path="/creategroup" component={CreateGroup} />
        <Route path="/createprofile" component={CreateProfile} />
        <Route path="/" component={Welcome} />
      </Switch>
    </div >
  )
}

export default LoggedInView
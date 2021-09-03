import { Route, Switch } from "react-router-dom"
import Home from "./Home/Home"
import SignIn from "./Registrations/SignIn"
import SignUp from "./Registrations/SignUp"

const LoggedOutView = () => {
  return (
    <Switch>
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/" component={Home} />
    </Switch>
  )
}

export default LoggedOutView
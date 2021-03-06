import React, { Profiler } from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Profile from "./Profile"

function App() {
  return (
    <Container 
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh "}}
    >
      {/*minwidth 400px - fix spacing*/}
      <div className = "w-100">
      {/* <div className = "w-75"> */}
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <Route path = "/profile" component={Profile} />
              <PrivateRoute  path="/update-profile" component={UpdateProfile} />
              <Route path = "/signup" component={Signup} />
              <Route path = "/login" component={Login} />
              <Route path = "/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App

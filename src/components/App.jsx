
import Home from "./Home"
import Login from "./Login"
import Register from "./Register"
import { Switch, Route } from "react-router-dom"
import { useState, useEffect } from "react";
import PrivateRoute from "./PrivateRoute";
import Secret from "./Secret";


export default function App() {

    return (
        <div>
            <Switch>
                <Route exact path="/" render={() => <Home />} />
                <Route path="/login" render={() => <Login />} />
                <Route path="/register" render={() => <Register />} />
                <PrivateRoute path="/secret" component={Secret} />
            </Switch>
        </div>
    )
}

import Home from "./Home"
import Login from "./Login"
import Register from "./Register"
import { Switch, Route } from "react-router-dom"


export default function App() {
    return (
        <div>
            <Switch>
                <Route exact path="/" render={() => <Home />} />
                <Route path="/login" render={() => <Login />} />
                <Route path="/register" render={() => <Register />} />
            </Switch>
        </div>
    )
}
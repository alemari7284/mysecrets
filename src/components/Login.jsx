import axios from "axios"
import { Redirect } from "react-router";
import { useState } from "react";

export default function Login() {

    const [redirect, setRedirect] = useState(false)

    const onClick = () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        let obj = {
            username,
            password
        }

        axios.post("http://localhost:4000/login", obj, {headers: {"Content-Type": "application/json"}})
        .then(res => {
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("refreshToken", res.data.refreshToken)
            setRedirect(true);
        })
        .catch(err => console.log(err))
    }
    
    return (
        <div>
            <h1>LOGIN</h1>
            <input id="username" type="text" placeholder="username" />
            <input id="password" type="text" placeholder="password" />
            {redirect && <Redirect to="/secret" />}
            <button onClick={onClick}>SUBMIT</button>
        </div>

    )
}
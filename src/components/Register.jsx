import axios from "axios"
import { Redirect } from "react-router";
import { useState } from "react";

export default function Register() {

    const [redirect, setRedirect] = useState(false)

    const onClick = () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        axios.post("http://localhost:4000/register", {username, password}, { headers: {"Content-Type": "application/json"}})
        .then(res => {
            sessionStorage.setItem("token", res.data.token)
            sessionStorage.setItem("refreshToken", res.data.refreshToken)
            setRedirect(true);
        })
        .catch(err => console.log(err))
    }


    return (
        <div>
            <h1>REGISTER</h1>
            <input id="username" type="text" placeholder="username" />
            <input id="password" type="text" placeholder="password" />
            {redirect && <Redirect to="/secret" />}
            <button onClick={onClick}>SUBMIT</button>
        </div>

    )
}
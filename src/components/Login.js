import axios from "axios"

export default function Login() {

    const onClick = () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        let obj = {
            username,
            password
        }

        axios.post("http://localhost:4000/login", obj, {headers: {"Content-Type": "application/json"}})
        .then(res => {
            console.log(res);
        })
    }
    
    return (
        <div>
            <h1>LOGIN</h1>
            <input id="username" type="text" placeholder="username" />
            <input id="password" type="text" placeholder="password" />
            <button onClick={onClick}>SUBMIT</button>
        </div>

    )
}
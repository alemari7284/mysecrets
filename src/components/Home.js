import { useHistory } from "react-router-dom"


export default function Home() {
    const history = useHistory();

    return (
        <div>
            <h1>WELCOME TO MY SECRETS PAGE</h1>
            <button onClick={() => {history.push("/login")}}>LOGIN</button>
            <button onClick={() => {history.push("/register")}}>REGISTER</button>
        </div>

    )
}
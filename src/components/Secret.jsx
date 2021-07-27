import React from 'react'
import axios from 'axios'
import { useState } from 'react'

export default function Secret() {

    const [secrets, setSecrets] = useState([]);
    const [loading, setLoading] = useState(false);

    const onClick = () => {
        setLoading(true);
        axios.get("http://localhost:4001/posts", {headers: {"authorization": sessionStorage.getItem("token")}})
        .then(res => setSecrets(res.data))
        .then(setLoading(false))
    }


    return (
        <div>
            <h1>SECRETS - private area</h1>
            <button onClick={onClick}>GET SECRETS</button>
            <ul>
                {
                    loading ? <h1>loading...</h1> : null
                }
                {
                    secrets && secrets.map((x) => <li>TITLE: {x.title}, AUTHOR: {x.author}</li>)
                }
            </ul>
        </div>
    )
}

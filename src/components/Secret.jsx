import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
var _ = require('lodash');


export default function Secret() {

    const [secrets, setSecrets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expired, setExpired] = useState(false);
    const [startCounting, setStartCounting] = useState(false);
    
    const [seconds, setSeconds] = useState(35)

    useEffect(() => {   //LA PRIMA VOLTA
        setTimeout(() => {setExpired(true)}, 35000)
        setInterval(() => {setSeconds(value => value -1)}, 1000)
    }, [])

    useEffect(() => {   //LE VOLTE SUCCESSIVE
        if (startCounting) {
            setTimeout(() => {setExpired(true)}, 35000)
        }
    }, [startCounting])

    const getSecrets = async() => {
        await setLoading(true);

        const res = await axios.get("http://localhost:4001/posts", {headers: {"authorization": sessionStorage.getItem("token")}})
        await setSecrets(res.data)
        await setLoading(false)
    }

    const refreshToken = async() => {
        setStartCounting(false);
        const newToken = await axios.post("http://localhost:4000/token", {refreshToken: sessionStorage.getItem("refreshToken")}, {headers: {"Content-Type": "application/json"}})
        sessionStorage.removeItem("token");
        sessionStorage.setItem("token", newToken.data);
        setLoading(false);
        setExpired(false);
        setStartCounting(true);
        setSeconds(35);
    }

    return (
        <div>
            <h1>SECRETS - private area</h1>
            <button onClick={getSecrets}>GET SECRETS</button>
            {!expired && loading ? <h1>loading...</h1> : null}
            <ul>
                {!expired && secrets && secrets.map((x, i) => <li key={i}> title: {_.upperCase(x.title)}, author: {_.upperCase(x.author)}</li>)}
            </ul>
            {expired && 
            <div>
                <h1>Your token has expired, click here for a new one</h1>
                <button onClick={refreshToken}>REFRESH TOKEN</button>
            </div>
             }
             {seconds > 0 && <h3>{seconds}</h3>}
        </div>
    )
}

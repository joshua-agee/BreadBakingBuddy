import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function Logout(props) {
    const baseURL = process.env.REACT_APP_API_URL
    let history = useHistory();
    const handleLogout = () => {
        axios.get(baseURL+"user/logout").then((res)=>{
            if (res.data.status.code === 200) {
                props.setUser({loggedIn: false});
            }
            history.push("/")
        }).catch((err)=>{
            console.log(err);
        })
    }
    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

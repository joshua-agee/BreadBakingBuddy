import React from 'react'
import axios from 'axios'


export default function Logout(props) {
    const baseURL = process.env.REACT_APP_API_URL

    const handleLogout = () => {
        axios.get(baseURL+"user/logout").then((res)=>{
            if (res.data.status.code === 200) {
                props.setUser({loggedIn: false});
            }
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

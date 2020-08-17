import React, { useState } from 'react'
import axios from 'axios'


export default function Register(props) {

    const [user, setUser] = useState({ loggedIn: false, username: "", email: "", password: "" });
    const baseURL = process.env.REACT_APP_API_URL

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newUserInfo = { ...user }
        newUserInfo[name] = value
        setUser(newUserInfo)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(baseURL + "user/register", {
            username: user.username,
            email: user.email,
            password: user.password
        }).then((res) => {
            console.log(res)
            props.setUser({
                loggedIn: true,
                username:res.data.data.username,
                id: res.data.data.id,
                email: res.data.data.email
            })
        }).catch((err) => {
            console.log(err)
        })
    }


    return (
        <div>
            <form>
                <input
                    name="username"
                    placeholder="Username"
                    value={user.username}
                    onChange={(e) => handleChange(e)}
                />
                <input
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) => handleChange(e)}
                />
                <input
                    name="password"
                    placeholder="password"
                    value={user.password}
                    onChange={(e) => handleChange(e)}
                    type="password"
                />
                <button onClick={handleSubmit}>Sign Up</button>
            </form>
        </div>
    )
}

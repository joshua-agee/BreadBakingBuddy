import React, { useState } from 'react'
import axios from 'axios'
import Redirect from 'react-router-dom'

export default function Login(props) {

    const [userForm, setUserForm] = useState({ loggedIn: false, username: "", id:"", email: "", password: "" });

    const baseURL = process.env.REACT_APP_API_URL

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newUserInfo = { ...userForm }
        newUserInfo[name] = value
        setUserForm(newUserInfo)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(baseURL + "user/login", {
            email: userForm.email,
            password: userForm.password
        }).then((res) => {
            console.log(res)
            props.setUser({
                loggedIn: true,
                id: res.data.data.id,
                email: res.data.data.email,
                username: res.data.data.username
            });
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="login">
            <form>
                <input
                    name="email"
                    placeholder="Email"
                    value={userForm.email}
                    onChange={(e) => handleChange(e)}
                />
                <input
                    name="password"
                    placeholder="password"
                    value={userForm.password}
                    onChange={(e) => handleChange(e)}
                    type="password"
                />
                <button onClick={handleSubmit}>Login</button>
            </form>
            {/* {user.loggedIn &&  <Redirect to="/recipes" />} */}
        </div>
    )
}

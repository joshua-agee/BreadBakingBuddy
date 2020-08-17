import { React, useState } from 'react'
import axios from 'axios'


export default function Login() {

    const [user, setUser] = useState({ loggedIn: false, username: "", email: "", password: "" });

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
            
        }).catch((err) => {
            console.log(err)
        })


    return (
        <div className="login">
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

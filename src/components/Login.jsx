import React, { useState } from 'react'
import axios from 'axios'
import { Button, FormGroup, FormControl, FormLabel, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default function Login(props) {

    const [userForm, setUserForm] = useState({ loggedIn: false, username: "", id:"", email: "", password: "" });
    const [show, setShow] =useState(false);
    
    const baseURL = process.env.REACT_APP_API_URL
    const history = useHistory();
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
            if (res.data.status.code === 200){
                props.setUser({
                    loggedIn: true,
                    id: res.data.data.id,
                    email: res.data.data.email,
                    username: res.data.data.username
                });
                history.push("/")
            } else {
                alert(res.data.status.message);
                history.push("/user/login")
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email">
                    <FormLabel>Email</FormLabel>
                <FormControl
                    autoFocus
                    name="email"
                    type="email"
                    value={userForm.email}
                    onChange={(e) => handleChange(e)}
                />
                <FormLabel>Password</FormLabel>
                <FormControl
                    name="password"
                    placeholder="password"
                    value={userForm.password}
                    onChange={(e) => handleChange(e)}
                    type="password"
                />
                </FormGroup>
                <Button type="submit">Login</Button>
            </form>
            {/* {user.loggedIn &&  <Redirect to="/recipes" />} */}
        </div>
    )
}

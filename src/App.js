/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import './App.css';
import Container from "react-bootstrap/Container"
import NewRecipeForm from "./components/NewRecipeForm"
import axios from "axios"

function App() {
  
  const baseURL = process.env.REACT_APP_API_URL
  
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState({loggedIn: false, username: "", email: "", password: ""});

  const fetchRecipes = () => {
    axios.get(baseURL+"recipes/")
      .then((data) => {
        console.log(data.data.recipes);
        setRecipes(data.data.recipes)
      }).catch(err => console.log(err))
    // fetch(baseURL+"recipes/", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    // }).then(
    //   (data) => {
    //     // console.log(data);
    //     return data.json();
    //   },
    //   (err) => console.log(err)
    // ).then (
    //   (parsedData) =>{
    //     console.log(parsedData.recipes);
    //     setRecipes(parsedData.recipes);
    //   }, 
    //   (err) =>{
    //     console.log(err);
    //   }
    // );
  }
  useEffect(() => {
    fetchRecipes();
    return () => {
    }
  }, [])
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newUserInfo = {...user}
    newUserInfo[name] = value
    setUser(newUserInfo)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(baseURL+"user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: user.username,
        email: user.email,
        password: user.password
      })
    }).then((res) => res.json())
    .then((resJson)=>{
      console.log(resJson);
    })
  }
  return (
    <div className="App">
      <Container>
      <h1>Bread Baking Buddy</h1>
      <div className="login">
        <form>
          <input
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={(e)=>handleChange(e)}
            />
          <input
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={(e)=>handleChange(e)}
            />
          <input
            name="password"
            placeholder="password"
            value={user.password}
            onChange={(e)=>handleChange(e)}
            type="password"
          />
          <button onClick={handleSubmit}>Sign Up</button>
        </form>
      </div>
      <br></br>
      <NewRecipeForm />
      <ul>
        {(recipes !== undefined)? recipes.map((item)=>{
          return (
            <li key={item.id}>
              <a href={baseURL+"recipes/"+item.id}>{item.name}: {item.summary}</a>
            </li>
            )
        }) : ""}
      </ul>
      </Container>
    </div>
  );
}

export default App;

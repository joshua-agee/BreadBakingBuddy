/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import Container from "react-bootstrap/Container"
import NewRecipeForm from "./components/NewRecipeForm"
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom'
import Register from "./components/Register"
import RecipeList from "./components/RecipeList"
import Login from "./components/Login"
import Home from "./components/Home"
import Logout from "./components/Logout"
import Nav from "react-bootstrap/Nav"
import Recipe from "./components/Recipe"

function App() {
  const [user, setUser] = useState({
    loggedIn: false,
    username: "",
    id: "",
    email: "",
    refresh: false
  })
  const baseURL = process.env.REACT_APP_API_URL

  const [recipes, setRecipes] = useState([]);
    

  const fetchRecipes = () => {
      axios.get(baseURL + "recipes/")
          .then((data) => {
              console.log(data.data.recipes);
              setRecipes(data.data.recipes)
          }).catch(err => console.log(err))}

  useEffect(() => {
      fetchRecipes();
      return () => {
      }
      }, [])

  let history = useHistory();
  return (
    <Container>
      <Router>
        <Nav variant="pills" defaultActiveKey="/" className="mr-auto" >
          <Nav.Item>
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/recipes">Recipes</Link>
            </Nav.Link>
          </Nav.Item>
          {user.loggedIn && <Nav.Item><Nav.Link>
            <Link to="/recipes/new">Enter a new Recipe</Link>
          </Nav.Link></Nav.Item>}
          {user.loggedIn && <Nav.Item><Nav.Link>
            <Link to="/user/logout">Logout</Link>
          </Nav.Link></Nav.Item>}
          {!user.loggedIn && <Nav.Item><Nav.Link>
            <Link to="/user/login">Login</Link>
          </Nav.Link></Nav.Item>}
          {!user.loggedIn && <Nav.Item><Nav.Link>
            <Link to="/user/register">Register</Link>
          </Nav.Link></Nav.Item>}
        </Nav>

        <h1>Bread Baking Buddy</h1>
        <Switch>
          <Route path="/user/login">
            <Login user={user} setUser={setUser} />
          </Route>
          <Route path="/user/logout">
            <Logout user={user} setUser={setUser} />
          </Route>
          <Route path="/user/register">
            <Register user={user} setUser={setUser} />
          </Route>
          <Route path="/recipes/new">
            {user.email === "" ? 
              <Login user={user} setUser={setUser}/>
            : <NewRecipeForm user={user} setUser={setUser}/> }
          </Route>
          <Route path="/recipes/:id" children={<Recipe />} />
          <Route path="/recipes">
            <RecipeList user={user} setUser={setUser} recipes={recipes} fetchRecipes={fetchRecipes}/>
          </Route>
          <Route path="/">
            <Home user={user} setUser={setUser} />
          </Route>
        </Switch>

      </Router>
    </Container>
  )
}

export default App;

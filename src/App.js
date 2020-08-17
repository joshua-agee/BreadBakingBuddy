/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import './App.css';
import Container from "react-bootstrap/Container"
import NewRecipeForm from "./components/NewRecipeForm"
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Register from "./components/Register"
import RecipeList from "./components/RecipeList"
import Login from "./components/Login"
import Home from "./components/Home"
import Logout from "./components/Logout"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

function App() {
  const [user, setUser] = useState({
    loggedIn: false,
    username: "",
    id: "",
    email: ""
  })
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
            <NewRecipeForm user={user} />
          </Route>
          <Route path="/recipes">
            <RecipeList />
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

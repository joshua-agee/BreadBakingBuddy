/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import './App.css';
import Container from "react-bootstrap/Container"
// import dotenv

function App() {
  
  const baseURL = process.env.REACT_APP_API_URL
  
  const [recipes, setRecipes] = useState([]);

  function fetchRecipes () {
    
    fetch(baseURL+"recipes/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }).then(
      (data) => {
        // console.log(data);
        return data.json();
      },
      (err) => console.log(err)
    ).then (
      (parsedData) =>{
        console.log(parsedData.recipes);
        setRecipes(parsedData.recipes);
      }, 
      (err) =>{
        console.log(err);
      }
    );
  }
  useEffect(() => {
    fetchRecipes();
    return () => {
    }
  }, [])
  
  return (
    <div className="App">
      <Container>
      <h1>Bread Baking Buddy</h1>
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

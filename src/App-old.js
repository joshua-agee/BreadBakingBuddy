/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);

  function fetchRecipes () {
    const baseURL = "http://localhost:8000/"
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
        return (parsedData.recipes);
      }, 
      (err) =>{
        console.log(err);
      }
    );
  }
  useEffect(() => {
    setRecipes(fetchRecipes())
    return () => {
    }
  }, [])
  
  return (
    <div className="App">
      <ul>
        {(recipes !== [])? recipes.map((item, i)=>{
          <li>
            {item[i].name}
          </li>
        }) : ""}
      </ul>
    </div>
  );
}

export default App;

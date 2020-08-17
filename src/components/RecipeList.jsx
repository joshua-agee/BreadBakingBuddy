import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function RecipeList() {
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
    
    return (
        <div>
            <ul>
                {(recipes !== undefined) && recipes.map((item) => {
                    return (
                        <li key={item.id}>
                            <a href={baseURL + "recipes/" + item.id}>{item.name}: {item.summary}</a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
    }

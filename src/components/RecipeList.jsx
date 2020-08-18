import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ListGroup } from 'react-bootstrap'

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
            <ListGroup variant="flush">
                {(recipes !== undefined) && recipes.map((item) => {
                    return (
                        <ListGroup.Item key={item.id}>
                            <a href={baseURL + "recipes/" + item.id}>{item.name}: {item.summary}</a> 
                            {item.likes}
                            {item.comments}
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        </div>
    )
    }

import React, { useState, useEffect } from 'react'
import  { useParams } from "react-router-dom"
import axios from 'axios'
import EditRecipeForm from "./EditRecipeForm"
import { render } from '@testing-library/react';
import Button from 'react-bootstrap/Button'
export default function Recipe(props) {
    let {id} = useParams();
    const baseURL = process.env.REACT_APP_API_URL

    const [currentRecipe, setCurrentRecipe] = useState({
        data: ""
    });
      
  
    const fetchRecipe = () => {
        axios.get(baseURL + "recipes/"+id)
            .then((data) => {
                console.log(data.data);
                setCurrentRecipe(data.data)
            }).catch(err => console.log(err))}
  
    useEffect(() => {
        fetchRecipe();
        }, [])

    const editRecipe = () => {
        const recipeHead = {
            id: currentRecipe.data.id,
            name: currentRecipe.data.name,
            source: currentRecipe.data.source,
            contributor: currentRecipe.data.contributor,
            summary: currentRecipe.data.summary
        }
        render(<EditRecipeForm recipe={recipeHead} ingredients={currentRecipe.data.ingredients} directions={currentRecipe.data.directions} fetchRecipe={fetchRecipe}/>)
    }
    return (
        <div>
            <br></br>
            {currentRecipe.data !== "" && 
            <>
                <h1>{currentRecipe.data.name}</h1>
                <h3>Source: {currentRecipe.data.source}</h3>
                <h5>Contributor: {currentRecipe.data.contributor.username}</h5>
                <hr />
                <p>{currentRecipe.data.summary}</p>
                <h4>Ingredients:</h4>
                    <ul>
                        {currentRecipe.data.ingredients.map((ingredient, i)=>
                            <li key={i}>{ingredient["ingredient"]}:  {ingredient["amount"]}</li>)}
                    </ul>
                <h4>Directions:</h4>
                    <ol>
                        {currentRecipe.data.directions.map((instruction, i)=>
                        <li key={i}>{instruction["instruction"]}</li>)}
                    </ol>
            </>
            }
            {props.user.email !=="" &&
            <Button onClick={editRecipe}>Edit Recipe</Button>
            }
            <hr />
            <h5>Comments:</h5>

        </div>
    )
}

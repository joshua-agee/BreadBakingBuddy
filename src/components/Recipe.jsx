import React, { useState, useEffect } from 'react'
import  { useParams } from "react-router-dom"
import axios from 'axios'

export default function Recipe() {
    let {id} = useParams();
    const baseURL = process.env.REACT_APP_API_URL

    const [recipe, setRecipe] = useState([]);
      
  
    const fetchRecipe = () => {
        axios.get(baseURL + "recipes/"+id)
            .then((data) => {
                console.log(data.data);
                setRecipe(data.data)
            }).catch(err => console.log(err))}
  
    useEffect(() => {
        fetchRecipe();
        return () => {
        }
        }, [])
    return (
        <div>
            <h3>{id}</h3>
            {/* <h4>{recipe.data}</h4> */}
        </div>
    )
}

import React, {useState} from "react"

const baseURL = process.env.REACT_APP_API_URL
// import Recipe from "./Recipe";
// code in this section based on example from here : https://www.cluemediator.com/add-or-remove-input-fields-dynamically-with-reactjs
function NewRecipeForm() {
    const [ingredients, setIngredients] = useState([{ ingredient: "", amount: "" }])
    const [recipe, setRecipe] = useState({name: "", summary: "", source: "", photo: ""})
    const [directions, setDirections] = useState([{ step: "1", instruction: ""}])

    //handle change to non-array fields
    const handleRecipeChange = (e) => {
        const { name, value } = e.target;
        const newRecipe = {...recipe}
        newRecipe[name] = value
        setRecipe(newRecipe)
    }
    // handle input change on ingredient array
    const handleIngredientsChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...ingredients];
        list[index][name] = value;
        setIngredients(list);
    }; 
    const handleDirectionsChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...directions];
        list[index][name] = value;
        setDirections(list);
    }; 
    
    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...ingredients];
        list.splice(index, 1);
        setIngredients(list);
    };
    const handleDirectionsRemoveClick = index => {
        const list = [...directions];
        list.splice(index, 1);
        setDirections(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setIngredients([...ingredients, { ingredient: "", amount: "" }]);
    };
    const handleDirectionsAddClick = () => {
        setDirections([...directions, { step: "", instruction: "" }]);
    };

    //handle submission of new recipe

    const handleSubmit = (e) =>{
        e.preventDefault();
        fetch(baseURL + "recipes/", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name : recipe.name,
                summary : recipe.summary,
                ingredients : ingredients,
                directions : directions,
                source : recipe.source,
                photo : recipe.photo
            })
        }).then((res)=> res.json())
        .then((resJson)=>{
            console.log(resJson);
            // fetchRecipes();
        })
    }


    return(
        <div>
            <h2>New Recipe</h2>
            <div className="box">
            <input 
                name="name"
                placeholder="Recipe Name"
                value={recipe.name}
                onChange={e => handleRecipeChange(e)}
                /><br></br>
            <textarea 
                name="summary"
                placeholder="Summary"
                value={recipe.summary}
                onChange={e => handleRecipeChange(e)}
                /><br></br>
            <input
                name="source"
                placeholder="Enter your source URL(if any)"
                value={recipe.source}
                onChange={e => handleRecipeChange(e)}
                /><br></br>
            <input
                name="photo"
                placeholder="Enter your photo URL(if any)"
                value={recipe.photo}
                onChange={e => handleRecipeChange(e)}
                />
            <h3>Input Ingredients</h3>
            {ingredients.map((x, i)=> {
                return(
                    <div className="box" key={i}>
                        <ul>
                        {ingredients.length > i+1 && 
                        <li>{x.ingredient}: {x.amount}</li>
                        } </ul>
                            {ingredients.length -1 === i ? 
                        <div>
                            <input
                                name="ingredient"
                                placeholder="Enter ingredient"
                                value={x.ingredient}
                                onChange={e => handleIngredientsChange(e,i)}
                            />
                            <input
                                name="amount"
                                placeholder="Enter amount"
                                value={x.amount}
                                onChange={e => handleIngredientsChange(e,i)}
                                /> 
                        </div>
                        : "" } 
                        <div className="btn-box">
                            {ingredients.length !== 1 && <button className="mr10"
                            onClick={() => handleRemoveClick(i)}>Remove Ingredient</button>}
                            {ingredients.length - 1 === i && <button onClick={handleAddClick}>Add Ingredient</button>}
                        </div>
                    </div>
                )
            })}
            <h3>Input Directions</h3>
            {directions.map((x, i)=> {
                return(
                    <div className="box" key={i}>
                        <ul>
                        {directions.length > i+1 && 
                        <li>{x.step}: {x.instruction}</li>
                        } </ul>
                            {directions.length -1 === i ? 
                        <div>
                            <input
                                name="step"
                                placeholder="step"
                                value={x.step}
                                onChange={e => handleDirectionsChange(e,i)}
                            />
                            <input
                                name="instruction"
                                placeholder="Instruction"
                                value={x.instruction}
                                onChange={e => handleDirectionsChange(e,i)}
                                /> 
                        </div>
                        : "" } 
                        <div className="btn-box">
                            {directions.length !== 1 && <button className="mr10"
                            onClick={() => handleDirectionsRemoveClick(i)}>Remove Step</button>}
                            {directions.length - 1 === i && <button onClick={handleDirectionsAddClick}>Add Step</button>}
                        </div>
                    </div>
                )
            })}
        </div>
        <button onClick={handleSubmit}>Submit Recipe</button>
        </div>
    )
}
export default NewRecipeForm
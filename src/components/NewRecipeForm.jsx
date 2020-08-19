import React, {useState} from "react"
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Button, Form, Col } from 'react-bootstrap'

const baseURL = process.env.REACT_APP_API_URL
axios.defaults.withCredentials = true
// import Recipe from "./Recipe";
// code in this section based on example from here : https://www.cluemediator.com/add-or-remove-input-fields-dynamically-with-reactjs
function NewRecipeForm(props) {
    
    const [ingredients, setIngredients] = useState([{ ingredient: "", amount: "" }])
    const [recipe, setRecipe] = useState({name: "", summary: "", source: "", photo: ""})
    const [directions, setDirections] = useState([{ step: "", instruction: ""}])
    const history = useHistory();
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
        axios.post(baseURL+"recipes/",{
            name : recipe.name,
            summary : recipe.summary,
            ingredients : ingredients,
            directions : directions,
            source : recipe.source,
            photo : recipe.photo
        }).then((res)=>{
            console.log(res);
            props.fetchRecipes();
            history.push("/recipes")
        }).catch((err)=>{
            console.log(err);
        })
    }


    return(
        <div className="m-10">
            <h2>New Recipe</h2>
                <Form.Group controlId="formRecipeName">
                    <Form.Label>Recipe Name</Form.Label>
                    <Form.Control 
                        name="name"
                        placeholder="Recipe Name"
                        value={recipe.name}
                        onChange={e => handleRecipeChange(e)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formSummary">
                    <Form.Label>Summary</Form.Label>
                    <Form.Control 
                        name="summary"
                        as="textarea"
                        rows="4"
                        value={recipe.summary}
                        onChange={e => handleRecipeChange(e)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formSource">
                    <Form.Label>Source</Form.Label>
                    <Form.Control
                        name="source"
                        placeholder="Enter your source URL(if any)"
                        value={recipe.source}
                        onChange={e => handleRecipeChange(e)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPhotoLink">
                    <Form.Label>Photo Link</Form.Label>
                    <Form.Control
                        name="photo"
                        placeholder="Enter your photo URL(if any)"
                        value={recipe.photo}
                        onChange={e => handleRecipeChange(e)}
                        />
                    </Form.Group>
                <Form.Group controlId="inputIngredients">
                <Form.Label>Ingredients</Form.Label>
                {ingredients.map((x, i)=> {
                    return(
                        <div key={i}>
                            <Form.Row className="mb-2">
                                <Col xs="6">
                                    <Form.Control
                                    name="ingredient"
                                    placeholder="Enter ingredient"
                                    value={x.ingredient}
                                    onChange={e => handleIngredientsChange(e,i)}
                                    />
                                </Col>
                                <Col xs="4">
                                    <Form.Control
                                    name="amount"
                                    placeholder="Enter amount"
                                    value={x.amount}
                                    onChange={e => handleIngredientsChange(e,i)}
                                    /> 
                                </Col>
                                <Col xs="2">
                                {ingredients.length !== 1 && <Button className="mr-2"  
                                onClick={() => handleRemoveClick(i)}> - </Button>}
                                {ingredients.length - 1 === i && <Button className="mr-2"   onClick={handleAddClick}> + </Button>}
                                </Col>
                            </Form.Row>
                        </div>
                    )
                })}
            </Form.Group>
            <Form.Group controlId="inputDirections">
            <Form.Label>Directions</Form.Label>
            {directions.map((x, i)=> {
                return(
                    <div className="box" key={i}>
                        
                        <Form.Row>
                            <Form.Label column sm="1">Step:</Form.Label>
                            <Col xs="1">
                            <Form.Control
                                name="step"
                                placeholder="Step number"
                                value={ i + 1 }
                                onChange={e => handleDirectionsChange(e,i)}
                                className="mb-2"
                                disabled="true"
                            /></Col>
                            <Col>
                            <Form.Control
                                name="instruction"
                                placeholder="Instruction"
                                as="textarea"
                                rows="2"
                                value={x.instruction}
                                onChange={e => handleDirectionsChange(e,i)}
                                className="mb-2"
                                /></Col>
    
                        <div className="btn-box">
                            {directions.length !== 1 && <Button  className="mr-2 mb-2"
                            onClick={() => handleDirectionsRemoveClick(i)}> - </Button>}
                            {directions.length - 1 === i && <Button  className="mr-2 mb-2" onClick={handleDirectionsAddClick}> + </Button>}
                        </div>
                            </Form.Row>
                    </div>
                )
            })}
            </Form.Group>
        
        <Button variant="primary" className="m-10" onClick={handleSubmit}>Submit Recipe</Button>
        </div>
    )
}
export default NewRecipeForm
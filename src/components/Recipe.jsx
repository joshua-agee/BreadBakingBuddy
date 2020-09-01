import React, { useState, useEffect } from 'react'
import  { useParams } from "react-router-dom"
import axios from 'axios'
import EditRecipeForm from "./EditRecipeForm"
import { render } from '@testing-library/react';
import Comments from './Comments'
import {Modal, Form, Button} from 'react-bootstrap'

export default function Recipe(props) {
    let {id} = useParams();
    const baseURL = process.env.REACT_APP_API_URL

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    
    const [newComment, setNewComment] = useState({
        title: "",
        comment: ""
    })
    const handleChange = (e) => {
        const {name, value} = e.target;
        const updatedComment = {...newComment}
        updatedComment[name] = value
        setNewComment(updatedComment)
    }
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
                <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formAddCommentTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Comment Title" 
                                value={newComment.title}
                                name="title"
                                onChange={ e => handleChange(e)}
                                />
                        </Form.Group>
                        <Form.Group controlId="formAddComment">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                placeholder="Comment..." 
                                rows="3" 
                                value={newComment.comment}
                                name="comment"
                                onChange={ e => handleChange(e)}
                                />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                </Button>
                    <Button variant="primary" type="submit">Submit</Button>
                </Modal.Footer>
            </Modal> 
            </>
            }
            
            {currentRecipe.data !== "" && props.user.loggedIn &&
            <>
                {props.user.username == currentRecipe.data.contributor.username && 
                    <Button onClick={editRecipe} className="mr-2">Edit Recipe</Button>
                }
                <Button className="mr-2">Like</Button>
                <Button onClick={() => setShow(true)}>Add Comment</Button>
            </>
            }
            <hr />
            <h5>Comments:</h5>
                <Comments id={id}/>
        </div>
    )
}

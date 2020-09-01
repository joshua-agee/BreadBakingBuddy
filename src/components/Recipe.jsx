import React, { useState, useEffect } from 'react'
import  { useParams } from "react-router-dom"
import axios from 'axios'
import EditRecipeForm from "./EditRecipeForm"
import { render } from '@testing-library/react';
import {Modal, Form, Button} from 'react-bootstrap'

export default function Recipe(props) {
    let {id} = useParams();
    const baseURL = process.env.REACT_APP_API_URL

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [comments, setComments] = useState([])
    const fetchComments = (id) => {
        axios.get(baseURL + "comment/recipe/"+id)
            .then((data) => {
                console.log(data.data.data)
                setComments(data.data.data)
            }).catch((err)=> console.log(err))
    }
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
    const [likes, setLikes] = useState("")
    const fetchRecipe = () => {
        axios.get(baseURL + "recipes/"+id)
            .then((data) => {
                console.log(data.data);
                console.log(data.data.likes)
                setCurrentRecipe(data.data)
                setLikes(data.data.likes)
            }).catch(err => console.log(err))}

    useEffect(() => {
        fetchRecipe()
        fetchComments(id)
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

    const handleSubmitComment = ()=> {
        axios.post(baseURL + "comment/" ,{
            on_recipe : currentRecipe.data.id,
            title : newComment.title,
            comment : newComment.comment,
            photo : ""
        }).then((res)=>{
            console.log(res);
            setShow(false);
            setNewComment({
                title: "",
                comment: ""
            })
            fetchComments(id)
        }).catch((err) =>{
            console.log(err);
        })
    }
    
    const handleLike = () => {
        axios.post(baseURL + "recipes/" + id + "/like")
            .then((res) =>{
                console.log(res)
            }).catch((err)=>{
                console.log(err);
            })
            fetchRecipe()
    }

    return (
        <div>
            <br></br>
            {currentRecipe.data !== "" && 
            <>
                <h1>{currentRecipe.data.name}</h1>
                <h3>Source: {currentRecipe.data.source}</h3>
                <h5>Contributor: {currentRecipe.data.contributor.username}</h5>
                <h5>Likes: {likes} </h5>
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
                    <Button variant="primary" type="submit" onClick={handleSubmitComment}>Submit</Button>
                </Modal.Footer>
            </Modal> 
            </>
            }
            
            {currentRecipe.data !== "" && props.user.loggedIn &&
            <>
                {props.user.username == currentRecipe.data.contributor.username && 
                    <Button onClick={editRecipe} className="mr-2">Edit Recipe</Button>
                }
                <Button className="mr-2" onClick={handleLike}>Like</Button>
                <Button onClick={() => setShow(true)}>Add Comment</Button>
            </>
            }
            <hr />
            <h5>Comments:</h5>
                <div>
                    {comments !== "" &&
                        <>
                            {comments.map((item) =>
                                <>
                                    <h3>{item.title}</h3>
                                    <h5>{item.by_user.username}</h5>
                                    <p>{item.comment}</p>
                                </>
                            )}
                        </>
                    }
                </div>
        </div>
    )
}

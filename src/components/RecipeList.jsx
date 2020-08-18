import React from 'react'

import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function RecipeList(props) {
    
    
    return (
        <div>
            <ListGroup variant="flush">
                {(props.recipes !== undefined) && props.recipes.map((item) => {
                    return (
                        <ListGroup.Item key={item.id}>
                            <Link to={"/recipes/" + item.id}>{item.name}: {item.summary}</Link> 
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        </div>
    )
    }

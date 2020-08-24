import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Comments(props) {
    const baseURL = process.env.REACT_APP_API_URL
    const [comments, setComments] = useState([])
    const fetchComments = (id) => {
        axios.get(baseURL + "comment/recipe/"+id)
            .then((data) => {
                console.log(data.data.data)
                setComments(data.data.data)
            }).catch((err)=> console.log(err))
    }
    useEffect(()=>{
        fetchComments(props.id);
    }, [])

    return (
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
    )
}

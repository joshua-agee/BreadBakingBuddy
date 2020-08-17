import React from 'react'

export default function Home(props) {
    return (
        <div>
            {props.user && <h3>Welcome {props.user.username}</h3>}
            <p>Welcome to the Bread Baking Buddy, where you can share and like bread baking recipes with others!</p>
        </div>
    )
}

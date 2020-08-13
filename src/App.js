/* eslint-disable no-unused-expressions */
import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: []
    }
    this.fetchRecipes = this.fetchRecipes.bind(this);
  }
  fetchRecipes() {
    const baseURL = "http://localhost:8000/"
    fetch(baseURL + "recipes/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }).then(
      (data) => {
        // console.log(data);
        return data.json();
      },
      (err) => console.log(err)
    ).then(
      (parsedData) => {
        console.log(parsedData.recipes)
        this.setState({
          recipes: parsedData.recipes
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  componentDidMount() {
    this.fetchRecipes();
  }

  render() {
    return (
      <Container>
        <h1>List of recipes</h1>
        <ul>
          {this.state.recipes.map((item) => {
            return (
              <li key={item.id}>
                {item.name}: {item.summary}
              </li>
            )
          })}
          </ul>
     </Container>
    )
  }
}

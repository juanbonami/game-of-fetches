// Where was Margaery Tyrell born?
// URL: http://anapioficeandfire.com/api/characters/16

// What region is House Targaryen in?
// URL: http://www.anapioficeandfire.com/api/houses/378

// What's the coat of arms of House Lannister?
// URL: http://www.anapioficeandfire.com/api/houses/229

// What is the second seat of House Baratheon?
// URL: http://www.anapioficeandfire.com/api/houses/17

// What is Robert Baratheon's second alias?
// URL: http://www.anapioficeandfire.com/api/characters/901

// What's the name of the founder of House Stark? (You have to chain fetch requests!)
// URL: http://www.anapioficeandfire.com/api/houses/362

// What are the titles of Catelyn Stark's three POV books? (Look into Promise.all to request these simultaniously)
// URL: http://www.anapioficeandfire.com/api/characters/232

import React, { Component } from 'react'
import './App.css';
import axios from 'axios'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      data: ''
    }
  }

  componentDidMount() {
    let one = "http://anapioficeandfire.com/api/characters/16";

    const requestOne = axios.get(one);
    requestOne.then(response => {
      const retrieve = response.data.born
      console.log(retrieve)

      this.setState({
      isLoaded: true,
      data: retrieve 
    })
      
    }).catch(error => {
      console.err(error)
    })

    

}


  render() {
    return (
      <div>
        <h1> {this.state.data} </h1>
        {/* <ul>
          {this.state.data.map((recipe, id) => <li key={id}> {recipe.born} </li>)}
        </ul> */}
      </div>
    )
  }
}
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
import Seven from './components/Seven';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      data: []
    }
  }

  componentDidMount() {
    
    let one = "http://anapioficeandfire.com/api/characters/16";
    let two = "http://www.anapioficeandfire.com/api/houses/378";
    let three = "http://www.anapioficeandfire.com/api/houses/229";
    let four = "http://www.anapioficeandfire.com/api/houses/17";
    let five = "http://www.anapioficeandfire.com/api/characters/901";
    let six = "http://www.anapioficeandfire.com/api/houses/362";

    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);
    const requestThree = axios.get(three);
    const requestFour = axios.get(four);
    const requestFive = axios.get(five);
    const requestSix = axios.get(six);
    
    // Makes a get request to all
    axios.all([requestOne, requestTwo, requestThree, requestFour, requestFive, requestSix])
    .then(axios.spread((...responses) => {
      // responses has 6 JSON objects in array
      // console.log to see the responses
      console.log(responses)
      const responseOne = responses[0].data.born
      const responseTwo = responses[1].data.region
      const responseThree = responses[2].data.coatOfArms
      const responseFour = responses[3].data.seats[1]
      const responseFive = responses[4].data.titles[1]
      // first chained get request 
      const responseSix = responses[5].data.founder
      // responseSix has a second url that needs to be fetched
      // console.log to see the JSON
      console.log(responseSix)
      const responseSixnHalf = axios.get(responseSix)
      // responsesixnHalf has founders name
      // console.log to see the JSON
      console.log(responseSixnHalf)
      
      responseSixnHalf.then(res => {
        // fetching the founders name
        const  finalOne = res.data.name
        // console.log(finalOne)
        this.setState({
        data: [responseOne,responseTwo,responseThree,responseFour,responseFive,finalOne]
        })

      })
  

    })).catch(errors => {
      console.log('Error fetching data')
    }) 

}


  render() {
    return (
      <div>
        <h2>Where was Margaery Tyrell born?</h2>
        <h4> {this.state.data[0]} </h4>
        <h2>What region is House Targaryen in?</h2>
        <h4> {this.state.data[1]} </h4>
        <h2>What's the coat of arms of House Lannister?</h2>
        <h4> {this.state.data[2]} </h4>
        <h2>What is the second seat of House Baratheon?</h2>
        <h4> {this.state.data[3]} </h4>
        <h2>What is Robert Baratheon's second alias?</h2>
        <h4> {this.state.data[4]} </h4>
        <h2>What's the name of the founder of House Stark?</h2>
        <h4> {this.state.data[5]} </h4>
        <h2>What are the titles of Catelyn Stark's three POV books?</h2>
        <h4> <Seven /> </h4>
      </div>
    )
  }
}
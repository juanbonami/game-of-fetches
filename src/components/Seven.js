import React, { Component } from 'react'
import axios from 'axios';

export default class Seven extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: []
        }
    }

    componentDidMount() {

        // stores url
        let seven = "http://www.anapioficeandfire.com/api/characters/232";
        
        // makes get request to seven and stores result in requestSeven
        const requestSeven = axios.get(seven);

        // promise fetches 3 url in requestSeven JSON object
        requestSeven.then(res => {
            // url 1
            const book1 = res.data.povBooks[0]
            // url 2
            const book2 = res.data.povBooks[1]
            // url 3
            const book3 = res.data.povBooks[2]
            
            // console.log(book1) uncomment this line to see results in console

            // get request for 3 url's simultaneously 
            Promise.all([axios.get(book1),axios.get(book2),axios.get(book3)])
                // results for all save in resp
                .then(resp => {
                
                // change state
                this.setState({
                    data: [resp[0].data.name, resp[1].data.name , resp[2].data.name]
                })

            })
                
            
        })
        
    }
        

    render() {
        return (
            <div>
                {this.state.data[0]}, {this.state.data[1]}, {this.state.data[2]}
            </div>
        )
    }
}

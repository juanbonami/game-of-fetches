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
        let seven = "http://www.anapioficeandfire.com/api/characters/232";
        
        const requestSeven = axios.get(seven);
        requestSeven.then(res => {
            const book1 = res.data.povBooks[0]
            const book2 = res.data.povBooks[1]
            const book3 = res.data.povBooks[2]
            
            console.log(book1)
            Promise.all([axios.get(book1),axios.get(book2),axios.get(book3)])
                .then(resp => {
                // const author = resp
                console.log(resp[0].data.name)
                console.log(resp[1].data.name)
                console.log(resp[2].data.name)

                this.setState({
                    data: [resp[0].data.name, resp[1].data.name , resp[2].data.name]
                })

            })
                
            
        })
        
    }
        

    



    render() {
        return (
            <div>
                {this.state.data}
            </div>
        )
    }
}

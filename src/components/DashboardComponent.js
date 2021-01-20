import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import InputGroup from 'react-bootstrap/InputGroup'
import { Form, FormControl } from 'react-bootstrap'
import { Button, ButtonGroup } from 'react-bootstrap'
import {CardGroup, CardDeck, CardColumns} from 'react-bootstrap'
import DreamCard from './DreamCardComponent'
import './DashboardComponent.css'

class DashboardComponent extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             dreams_list : [],
        }

    }
    
    submitDream = (event)=>{//there's gotta be a better way without references (find out before internship)
        const titleNode = ReactDOM.findDOMNode(this._dreamTitle)
        const descNode = ReactDOM.findDOMNode(this._dreamDesc)
        const titleValue = titleNode.value
        const descValue = descNode.value

        var dream_object = {title: titleValue, desc: descValue, key: titleValue.concat(descValue)}//key is a combo of the title and desc, to ensure uniqueness
        
        //console.log(titleValue)
        //console.log(descValue)
        this.setState((prevState) =>{
            return{
                dreams_list: prevState.dreams_list.concat(dream_object)
            };
        })

        //console.log(dream_object)
        titleNode.value = ""
        descNode.value = ""
        event.preventDefault();
        
    }

    destroyCard = (key)=>{
        //console.log(key)
        //console.log(this.state.dreams_list)
        this.setState((prevState)=>{
            return{
                dreams_list: prevState.dreams_list.filter(dream_object => dream_object.key!==key)
            };
        });
    }

    processDreams(dream_object){
        return <DreamCard key = {dream_object.key} title = {dream_object.title} desc = {dream_object.desc} destroyFunction={this.destroyCard}/>;

    }
    render() {
        const dream_list = this.state.dreams_list
        const dreamListJSX = dream_list.map(this.processDreams, this)
        return (

            <div>
                <div className = "Dashboard-main">
                    <InputGroup className = "mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Dream Title</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl ref = {(title) => this._dreamTitle = title} type = "text" placeholder = "Enter title here" aria-label="Dream title"/>
                    </InputGroup>
                    <InputGroup size ="sm">
                        <InputGroup.Text>Dream Description</InputGroup.Text>
                    </InputGroup>
                    <InputGroup className = "mb-3">
                        <FormControl ref = {(desc) => this._dreamDesc = desc} as="textarea" rows = "7" aria-label ="dream desc area"/>
                    </InputGroup>

                    <ButtonGroup aria-label = "submission buttons" size = "lg">
                        <Button onClick = {this.submitDream} variant = "success">Submit</Button>
                    </ButtonGroup>
                  
                </div>
                
                <div className = "Card-group">
                    <h2 className = "Card-title">Your Dreams</h2>

                    <CardColumns>
                        {dreamListJSX}
                    </CardColumns>
                </div>
            </div>


        )
    }
}

export default DashboardComponent

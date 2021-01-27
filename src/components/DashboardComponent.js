import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import InputGroup from 'react-bootstrap/InputGroup'
import { Form, FormControl } from 'react-bootstrap'
import { Button, ButtonGroup } from 'react-bootstrap'
import {CardGroup, CardDeck, CardColumns} from 'react-bootstrap'
import DreamCard from './DreamCardComponent'
import './DashboardComponent.css'

//additional libs
import shortid from 'shortid'
//fix UI: https://dribbble.com/shots/6685452-Diary-UI


//aws
import { createDream, deleteDream } from '../graphql/mutations'
import { listDreams } from '../graphql/queries'

import Amplify, { API, graphqlOperation } from 'aws-amplify'
import awsExports from "../aws-exports";
Amplify.configure(awsExports);

class DashboardComponent extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             dreams_list : [],
        }

    }
    
    submitDream = async event=>{//there's gotta be a better way without references (find out before internship)

        event.preventDefault();

        const titleNode = ReactDOM.findDOMNode(this._dreamTitle)
        const descNode = ReactDOM.findDOMNode(this._dreamDesc)
        const titleValue = titleNode.value
        const descValue = descNode.value
        let [month, date, year] = new Date().toLocaleDateString("en-US").split("/")
        const dateString = month+"-"+date+"-"+year
        const id = shortid.generate()
        console.log(dateString)

        var dream_object = {name: titleValue, description: descValue, id: id, date: dateString}//key is a combo of the title and desc, to ensure uniqueness
        
        //console.log(titleValue)
        //console.log(descValue)
        this.setState((prevState) =>{
            return{
                dreams_list: prevState.dreams_list.concat(dream_object)
            };
        })
        await API.graphql(graphqlOperation(createDream, {input: dream_object}))
        console.log("Dream added")
        //console.log(dream_object)
        titleNode.value = ""
        descNode.value = ""
    
    }

    destroyCard = async key=>{
        //console.log(key)
        //console.log(this.state.dreams_list)
        try{
        //const removed_dream = this.state.dreams_list.filter(dream_object => dream_object.id == key)[0]//potentially bug hazard. To do with sync?
        this.setState((prevState)=>{
            return{
                dreams_list: prevState.dreams_list.filter(dream_object => dream_object.id!==key)
            };
        });

        await API.graphql(graphqlOperation(deleteDream, { input: { id: key }}));

        }catch(err){
            console.log("error with destroying dream")

        }   
    }

    processDreams(dream_object){
        return <DreamCard id = {dream_object.id} dream_object = {dream_object} destroyFunction={this.destroyCard}/>;

    }

    async fetchDreams(){
        try{
            const dreamData = await API.graphql(graphqlOperation(listDreams))
            const dreams = dreamData.data.listDreams.items
            console.log(dreams)
            this.setState((prevState) =>{
                return{
                    dreams_list: dreams
                };
            })
        }catch(err){
            console.log('error fetching dreams')
        }  

    }

    componentDidMount(){
        this.fetchDreams()
    }

    render() {
        const dream_list = this.state.dreams_list
        const dreamListJSX = dream_list.map(this.processDreams, this)

        const inputStyle = {
            backgroundColor: "rgb(67, 70, 73)",
            font: "Helvetica",
            fontWeight:"bold",
            color:"white",
            borderRadius: "0px"
        }

        const titleStyle = {
            borderRadius:"10px",
            backgroundColor: "rgb(87, 90, 93)",
            font: "Helvetica",
            fontWeight:"bold",
            color:"white",
        }

        return (

            <div className = "App">
                <div className = "Dashboard-main">
                    <InputGroup className = "mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text style = {inputStyle}>Dream Title</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl style = {inputStyle} ref = {(title) => this._dreamTitle = title} type = "text" placeholder = "Enter title here" aria-label="Dream title"/>
                    </InputGroup>
                    <InputGroup size ="sm">
                        <InputGroup.Text style = {inputStyle}>Dream Description</InputGroup.Text>
                    </InputGroup>
                    <InputGroup className = "mb-3">
                        <FormControl style = {inputStyle} ref = {(desc) => this._dreamDesc = desc} as="textarea" rows = "7" aria-label ="dream desc area"/>
                    </InputGroup>

                    <ButtonGroup aria-label = "submission buttons" size = "lg">
                        <Button onClick = {this.submitDream} variant = "success">Submit</Button>
                    </ButtonGroup>
                  
                </div>
                
                <div className = "Card-group" style = {{paddingTop:"50px"}} >
                    <h2 style = {titleStyle} className = "Card-title">Your Dreams</h2>

                    <CardColumns>
                        {dreamListJSX}
                    </CardColumns>
                </div>
            </div>


        )
    }
}

export default DashboardComponent

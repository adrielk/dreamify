import React from 'react'
import { Card, Button } from 'react-bootstrap'

//https://v4-alpha.getbootstrap.com/utilities/close-icon/ (code for x button)

function DreamCardComponent({dream_object, destroyFunction}) {

    function destroyCard(){
        destroyFunction(dream_object.id);//this is how the key is formed
    }

    const cardStyle = {//css within js!
        backgroundColor: "rgb(67, 70, 73)",
        borderRadius: "4px",
        boxShadow: "5px 10px",
    };

    const textStyle = {
        color: "white"
    };

    return (
        <div className = "Card-group">
            <Card style={cardStyle}>
                <button onClick={destroyCard} type="button" className="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div style = {textStyle}>
                    <Card.Body>
                        <Card.Title>{dream_object.name}</Card.Title>
                        <Card.Text>
                            {dream_object.description}
                        </Card.Text>

                    </Card.Body>
                    <Card.Footer>
                        <small>Submission date: {dream_object.date} </small>
                    </Card.Footer>
                </div>
            </Card>
        </div>
    )
}

export default DreamCardComponent

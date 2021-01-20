import React from 'react'
import { Card, Button } from 'react-bootstrap

//https://v4-alpha.getbootstrap.com/utilities/close-icon/ (code for x button)

function DreamCardComponent({title, desc, destroyFunction}) {

    function destroyCard(){
        destroyFunction(title.concat(desc));//this is how the key is formed
    }

    return (
        <div className = "Card-group">
            <Card>
                <button onClick={destroyCard} type="button" className="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {desc}
                    </Card.Text>

                </Card.Body>
                <Card.Footer>
                    <small className = "text-muted">Time of submission here</small>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default DreamCardComponent

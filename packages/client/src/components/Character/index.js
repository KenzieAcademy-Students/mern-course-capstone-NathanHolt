import React, { useState } from 'react'
import { Nav, Button, Modal } from "react-bootstrap";
import Action from 'components/Action'
import './Character.css'
import { useUser } from 'hooks'
import PathForm from '../PathForm'

export default function Character(props) {
    const { test, data, index } = props
    const { deleteCharacter } = useUser()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const renderActions = (num) => {
        let acts = []
        for (let i = 0; i < data.paths.length; i++) {
            let storyLength = 10 * num
            let unit = 100 / storyLength 
            acts.push(<Action 
                    total={storyLength} 
                    position={unit * (i * 15) <= 100 ? unit * (i * 10) : unit} 
                    length={unit * (i * 2) < 3 ? 3 : unit * (i * 2)} 
                    title={data.paths[i].name}  
                    text={data.paths[i].description} 
                    />)
        }
        return acts 
    }
    
    return (
        <div className="line">
            <div onClick={() => handleShow()} className="add-char">
                <p>Add Path</p>
            </div>
            <div className="character">
                {data.paths && renderActions(test)}
            </div>
            <div onClick={() => deleteCharacter(data.name)} className="delete-char">
                <p>Delete Character</p>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Path</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PathForm />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            
        </div>
    )
}

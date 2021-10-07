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
            let storyLength = 100
            let unit = 100 / storyLength 
            acts.push(<Action 
                    total={storyLength} 
                    position={data.paths[i].start} 
                    length={ parseInt(data.paths[i].end) - parseInt(data.paths[i].start)} 
                    title={data.paths[i].name}
                    name={data.name}  
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
                    <PathForm name={data.name} />
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

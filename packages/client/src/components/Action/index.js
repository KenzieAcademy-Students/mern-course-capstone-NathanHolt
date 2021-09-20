import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import './Action.css'

export default function Action(props) {
    const { title, length, text } = props 

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <>
            <div className="action" onClick={() => handleShow()}>
                <div className="title">
                    <h3>{title}</h3>
                    <h4>{length}</h4>
                </div>
                <div className="desc">
                    <p>{text}</p>
                </div>
            </div>
        
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{text}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleClose}>
                    Delete?
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

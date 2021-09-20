import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import './Action.css'

export default function Action(props) {
    const { title, length, text, position, total } = props 

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const findPosition = () => {
        if (position === 0) return 0
        let newPos = position - length
        return newPos / total
    }
    
    return (
        <>
            <div style={{width: `${length}%`, marginLeft: `${findPosition()}%`}} className="action" onClick={() => handleShow()}>
                <div className="title">
                    <h3>{title}</h3>
                </div>
                <div className="desc">
                    <p>{text}</p>
                </div>
            </div>
        
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{title} at {position} for {length}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{text}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleClose}>
                    Delete
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

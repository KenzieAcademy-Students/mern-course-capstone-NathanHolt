import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useUser } from 'hooks'
import PathForm from '../PathForm'
import './Action.css'

export default function Action(props) {
    const { title, length, text, position, name } = props
    const { deletePath } = useUser() 

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [tempName, setTempName] = useState('');

    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleShow2 = () => setShow2(true);

    const handleEdit = (name) => {
        handleClose()
        setTempName(name)
        handleShow2()
    }

    // const findPosition = () => {
    //     if (position === 0) return 0
    //     let newPos = position - length 
    //     if (newPos < 0) newPos = newPos * -1 
    //     return newPos 
    // }
    
    return (
        <>
            <div style={{width: `${length}%`, left: `${position}%`}} className="action" onClick={() => handleShow()}>
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
                {/* <Button variant="primary" onClick={() => handleEdit(title)}>
                    Edit
                </Button> */}
                <Button variant="danger" onClick={() => deletePath({ title: title, name: name })}>
                    Delete
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show2} onHide={() => handleClose2()}>
                <Modal.Header closeButton>
                <Modal.Title>Edit a Path</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PathForm edit={true} editName={tempName} />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose2()}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

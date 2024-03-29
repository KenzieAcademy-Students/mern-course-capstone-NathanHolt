import React, { useState, useEffect } from "react";
import {Nav, Button} from "react-bootstrap";
import { withRouter } from "react-router";
import Modal from 'react-bootstrap/Modal'
import CharacterForm from './CharacterForm'
import { useUser } from 'hooks'
import "./StoryPageSideBar.css"

const Side = props => {
    const { returnState } = useUser()
   
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [tempName, setTempName] = useState('');
    const [data, setData] = useState(returnState());

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const handleEdit = (name) => {
        setTempName(name)
        handleShow2()
    }

    const displaychars = () => {
        return data.characters.map((char) => {
            return <Nav.Item style={{ backgroundColor: char.color }} onClick={() => handleEdit(char.name)}className="char">
                        <Nav.Link className="char-name">{char.name}</Nav.Link>
                    </Nav.Item>
        })
    }

    useEffect(() => {
        setData(returnState())
    }, [props.dummy])

    return (
        <div>
    
            <div className="sidebar"
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <div className="sidebar-sticky"></div>
            {/* <Nav.Item>
                <Nav.Link href="/home">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                Disabled
                </Nav.Link>
            </Nav.Item> */}

            {data.characters && displaychars()}
            
            </div>

            <Button variant="primary" onClick={handleShow}>
                Add a Character
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add a Character</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CharacterForm />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                <Modal.Title>Edit a Character</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CharacterForm edit={true} editName={tempName} />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose2}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
        );
  };
  const Sidebar = withRouter(Side);
  export default Sidebar
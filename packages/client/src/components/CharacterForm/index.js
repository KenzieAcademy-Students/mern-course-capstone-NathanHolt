import React, { useState } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useUser } from 'hooks'
import './CharacterForm.css'

export default function CharacterForm() {
    const { addCharacter } = useUser()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [color, setColor] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        addCharacter({ name: name, description: description, color: color })
    }
    
    return (
        <div>
            <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group size='lg' controlId='email'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                autoFocus
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>
            <Form.Group size='lg' controlId='email'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>
            <Form.Group size='lg' controlId='password'>
                <Form.Label>Color</Form.Label>
                <Form.Control
                type='color'
                value={color}
                onChange={(e) => setColor(e.target.value)}
                />
            </Form.Group>
            <Button block size='lg' type='submit' >
                Walk a new Path...
            </Button>
            </Form>
        </div>
    )
}

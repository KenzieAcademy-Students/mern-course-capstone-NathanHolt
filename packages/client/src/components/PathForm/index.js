import React, { useState } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useUser } from 'hooks'
import './PathForm.css'

export default function PathForm(props) {
    const { name } = props
    const { addPath } = useUser()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault()
        addPath({ title: title, name: name, description: description, start: start, end: end })
    }
    
    return (
        <div>
            <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group size='lg' controlId='email'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                autoFocus
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                <Form.Label>Start</Form.Label>
                <Form.Control
                type='number'
                value={start}
                onChange={(e) => setStart(e.target.value)}
                />
            </Form.Group>
            <Form.Group size='lg' controlId='password'>
                <Form.Label>End</Form.Label>
                <Form.Control
                type='number'
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                />
            </Form.Group>
            <Button block size='lg' type='submit' >
                Walk a new Path...
            </Button>
            </Form>
        </div>
    )
}

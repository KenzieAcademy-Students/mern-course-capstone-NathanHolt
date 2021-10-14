import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'
import { useUser } from 'hooks'
import axios from 'axios'
import './StoryForm.css'

export default function StoryForm() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const history = useHistory()
  const { initialSet } = useUser()
  const user = JSON.parse(localStorage.getItem('user'))
  const validateForm = () => name.length > 0

  async function handleSubmit(event) {
    event.preventDefault()
    let res = await axios.post('/api/dev/create/story', {
      name,
      description,
      user,
    })
    initialSet(res.data)
    console.log(res.data)
    history.push(`/story/${name}`)
  }

  return (
    <div className='Login'>
      <div className='form'>
        <Form onSubmit={handleSubmit}>
          <Form.Group size='lg' controlId='name'>
            <Form.Label>Choose a title</Form.Label>
            <Form.Control
              autoFocus
              type='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group size='lg' controlId='description'>
            <Form.Label>Add a description</Form.Label>
            <Form.Control
              type='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Button block size='lg' type='submit' disabled={!validateForm()}>
            Create Story
          </Button>
        </Form>
      </div>
    </div>
  )
}

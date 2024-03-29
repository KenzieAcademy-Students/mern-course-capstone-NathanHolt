import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import './SignIn.css'

export default function SignInLogic() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  function validateForm() {
    return username.length > 0 && password.length > 0
  }

  async function handleSubmit(event) {
    event.preventDefault()
    let res = await axios.post('/api/signup/signin', {
      username: username,
      password: password,
    })
    localStorage.setItem('user', JSON.stringify(res.data))
    history.push(`/user/${username}`)
  }
  return (
    <div className='Login'>
      <div className='form'>
        <Form onSubmit={handleSubmit}>
          <Form.Group size='lg' controlId='email'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group size='lg' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button block size='lg' type='submit' disabled={!validateForm()}>
            Login
          </Button>
          <div>
            <Button size='small' onClick={() => history.push('/signup')}>
              Don't have an account?
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

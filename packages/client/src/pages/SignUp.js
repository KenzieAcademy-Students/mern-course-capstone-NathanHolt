import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from 'axios';

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const history = useHistory();

  function validateForm() {
    if (email.length > 0 && password.length > 0 && username.length > 0 && password === password2) {
      return true;
    } else return false;
  }
  async function handleSubmit(event) {
    event.preventDefault();
    let res = await axios.post('/api/signup/signup', {
      username: username,
      password: password,
      email: email,
    })
    localStorage.setItem("user", username)
    history.push(`/user/${username}`)
  }
  return (
    <div className='sign-up'>
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
          <Form.Group size='lg' controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <Form.Group size='lg' controlId='password'>
            <Form.Label>Retype Password</Form.Label>
            <Form.Control
              type='password'
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </Form.Group>
          <Button block size='lg' type='submit' disabled={!validateForm()}>
            Sign Up
          </Button>
          <div>
            <Button size='small' onClick={() => history.push("/log")}>
              Already have an account?
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

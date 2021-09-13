import React, {useState,useEffect} from 'react'
import {Container, Card, Form, Button, Collapse, Figure} from react-bootstrap
import {LoadingSpinner} from 'components'
import axios from
export default function UserPage({
    match: {
        params: {uid},
    },
    history
}) {
    const { state } = useProvideAuth ()
    const [user, setUser] = useState ()
    const [loading, setLoading] = useState (true)
    const [validated, setValidated] = useState(false)
    const [open, setOpen] = useState (false)
    const [data, setData] = useState ({
        newPassword: '',
        currentPassword: '',
        isSubmitting: false,
        errorMessage: null,
    })
    const {
        state: { isAuthenticated },
    } = useRequireAuth ()

    
  
}
return (
    <>
    <Container className='clearfix'>
      <Button variant='outline-info' onClick={()=>{history.goBack()}}
      >
          </Button
          <Card bg='header' className='text-center'>
        <Card.Body>
          <Figure
            className='bg-border-color rounded-circle overflow-hidden my-auto ml-2 p-1'
            style={{
              height: '50px',
              width: '50px',
              backgroundColor: 'white',
            }}
          >
                <Card.Title>{uid}</Card.Title>
          {state.user.username === uid && (
            <div onClick={() => setOpen(!open)} style={{cursor: 'pointer', color: '#BFBFBF'}}>Edit Password</div>
          )}
          { open && (
            <Container animation="false">
              <div className='row justify-content-center p-4'>
                <div className='col text-center'>
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleUpdatePassword}
                  ></Form>
                     <Form.Group>
                      <Form.Label htmlFor='current password'>Current Password</Form.Label>
                      <Form.Control
                        type='password'
                        name='currentPassword'
                        required
                        value={data.currentPassword}
                        onChange={handleInputChange}
                      />
                       <Form.Group>
                      <Form.Label htmlFor='new password'>New Password</Form.Label>
                      <Form.Control
                        type='password'
                        name='newPassword'
                        required
                        value={data.newPassword}
                        onChange={handleInputChange}
                      />
                         <Form.Control.Feedback type='invalid'>
                        New Password is required
                      </Form.Control.Feedback>
                      <Form.Text id='passwordHelpBlock' muted>
                        Must be 8-20 characters long.
                      </Form.Text>
                    </Form.Group>
                    {data.errorMessage && (
                      <span className='form-error'>{data.errorMessage}</span>
                    )}
                    <Button type='submit' disabled={data.isSubmitting}>
                      {data.isSubmitting ? <LoadingSpinner /> : 'Update'}
                    </Button>
                  </Form.Group>
                  </Form>
                </div>
              </div>
            </Container>
            </Card.Body>
            </Card>
          </Container>
          <Container
          )}
)
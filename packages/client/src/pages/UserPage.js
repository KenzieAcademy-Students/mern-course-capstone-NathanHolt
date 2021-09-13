import React, { useState, useEffect } from 'react'
import {
  Container,
  Card,
  Form,
  Button,
  Collapse,
  Figure
} from 'react-bootstrap'
import { LoadingSpinner, Post } from 'components'
import { useProvideAuth } from 'hooks/useAuth'
import { useRequireAuth } from 'hooks/useRequireAuth'
import axios from 'utils/axiosConfig.js'


export default function UserDetailPage({
  match: {
    params: { uid },
  },
  history
}) {
  const { state } = useProvideAuth()
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [validated, setValidated] = useState(false)
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({
    newPassword: '',
    currentPassword: '',
    profileImage:'',
    isSubmitting: false,
    errorMessage: null,
  })

  const {
    state: { isAuthenticated },
  } = useRequireAuth()

  useEffect(() => {
    const getUser = async () => {
      try {
        const userResponse = await axios.get(`users/${uid}`)
        setUser(userResponse.data)
        setLoading(false)
      } catch (err) {
        console.error(err.message)
      }
    }
    isAuthenticated && getUser()
  }, [uid, isAuthenticated])

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const handleUpdatePassword = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      setValidated(true)
      return
    }
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    })
    try {
      const {
        user: { uid, username },
      } = state
      let success=await axios.put(`users/${uid}`,{password: data.password})
      if(success){
        toast.success("Password has been changhed")
        setData({
          ...data,
          isSubmitting: false,
          
        })
      }
      console.log(data.password, uid, username)
      await axios.put(`users/${uid}`,{newPassword:data.newPassword,currentPassword:data.currentPassword,profileImage:data.profileImage})
      setValidated(false)
      setData({
        ...data,
        isSubmitting:false,

      })
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error.message,
      })
    }
  }

  if (!isAuthenticated) {
    return <LoadingSpinner full />
  }

  if (loading) {
    return <LoadingSpinner full />
  }

  return (
    <>
    <Container className='clearfix'>
      <Button variant='outline-info' onClick={()=>{history.goBack()}}

        className="mt-3 mb-3"
        >
        Go Back
      </Button>
      <Card  className='text-center'>
        <Card.Body>
          <Figure
            className='bg-border-color rounded-circle overflow-hidden my-auto ml-2 p-1'
           
          >
            <Figure.Image
              src={user.profile_image}
              className='w-100 h-100'
            />
          </Figure>

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
                  >
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
          )}
        
        </Card.Body>
      </Card>
    </Container>
    <Container
      className='pt-3 pb-3'
    >
    </Container>
    </>
  )
}
            
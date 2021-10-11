import React, { useState, useEffect } from 'react'
import LogOutBtn from 'components/LogOutBtn'
import Logo from 'components/Logo'
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
import { useUser } from 'hooks'
import axios from 'axios'
import './StoryHeader.css'

export default function StoryHeader(props) {
  const { displayer } = props
  const { returnState } = useUser()
  const history = useHistory()

  const [user, setUser] = useState('')
  const [data, setData] = useState(returnState())

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")))
  }, [])

  const instance = axios.create({
    baseURL: `http://localhost:3000/api/`,
  })

  const handleDelete = async () => {
    let newData = returnState()
    let res = await instance.delete(`dev/delete/${newData._id}`, { data: { user: user } })
    history.push(`/user/${user.username}`)
  }
  
    return (
        <div className="header">
            <Logo />
          <div className="nav">
            <Button variant="secondary" onClick={() => history.push(`/user/${user.username}`)}>See all Stories</Button> 
            {/* <Button variant="outline-dark" onClick={() => displayer('new')}>Create new Story</Button>  */}
            <Button variant="outline-danger" onClick={() => handleDelete()}>Delete Story</Button>
          </div>
          <div className="log-out">
            <LogOutBtn />
          </div>
        </div>
    )
}

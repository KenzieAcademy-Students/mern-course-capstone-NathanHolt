import React, { useState, useEffect } from 'react'
import LogOutBtn from 'components/LogOutBtn'
import Logo from 'components/Logo'
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
import './StoryHeader.css'

export default function StoryHeader(props) {
  const history = useHistory()
  const { displayer } = props

  const [user, setUser] = useState('')

  useEffect(() => {
    setUser(localStorage.getItem("user"))
  }, [])
  
    return (
        <div className="header">
            <Logo />
          <div className="nav">
            <Button variant="secondary" onClick={() => history.push(`/user/${user}`)}>See all Stories</Button> 
            <Button variant="outline-dark" onClick={() => displayer('new')}>Create new Story</Button> 
            <Button variant="outline-danger" onClick={() => displayer('delete')}>Delete Story</Button>
          </div>
          <div className="log-out">
            <LogOutBtn />
          </div>
        </div>
    )
}

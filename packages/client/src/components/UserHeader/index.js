import React from 'react'
import LogOutBtn from 'components/LogOutBtn'
import Button from 'react-bootstrap/Button'
import Logo from 'components/Logo'
import './UserHeader.css'

export default function UserHeader(props) {
  const { displayer } = props
  
    return (
        <div className="header">
          <Logo />
          <div className="nav">
            <Button variant="secondary" onClick={() => displayer('story')}>Stories</Button> 
            <Button variant="outline-dark" onClick={() => displayer('story-form')}>Create new Story</Button> 
          </div>
          <div className="log-out">
            <LogOutBtn />
          </div>
        </div>
    )
}

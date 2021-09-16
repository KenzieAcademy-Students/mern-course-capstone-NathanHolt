import React from 'react'
import LogOutBtn from 'components/LogOutBtn'
import Button from 'react-bootstrap/Button'
import './UserHeader.css'

export default function UserHeader(props) {
  const { displayer } = props
  
    return (
        <div className="header">
          <div className='logo'>
            logo
          </div>
          <div className="nav">
            <Button onClick={() => displayer('story')}>Stories</Button> 
            <Button onClick={() => displayer('story-form')}>Create new Story</Button> 
            <Button onClick={() => displayer('user')}>Edit Account</Button> 
          </div>
          <div className="log-out">
            <LogOutBtn />
          </div>
        </div>
    )
}

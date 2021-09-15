import React from 'react'
import LogOutBtn from 'components/LogOutBtn'
import './UserHeader.css'

export default function UserHeader(props) {
  const { displayer } = props
  
    return (
        <div className="header">
          <LogOutBtn />
        </div>
    )
}

import React from 'react'
import LogOutBtn from 'components/LogOutBtn'
import './UserHeader.css'

export default function UserHeader() {
    return (
        <div className="header">
          <LogOutBtn />
        </div>
    )
}

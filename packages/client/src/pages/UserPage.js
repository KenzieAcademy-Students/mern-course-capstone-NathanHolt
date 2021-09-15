import React, { useState } from 'react'
import LogOutBtn from 'components/LogOutBtn'

export default function UserPage() {
  const [display, setDisplay] = useState ('story')
  
  return (
    <div className="user-page">
        <div className="header">
          <LogOutBtn />
        </div>
        <div className="body">

          {display === 'story' && <div>
            <h1>Stories</h1>
            <div className="stories">
              <div className="story"></div>
              <div className="story"></div>
              <div className="story"></div>
              <div className="story"></div>
              <div className="story"></div>
              <div className="story"></div>
            </div>
          </div>}

          {display === 'story-form' && <div>
            <h1>Create a new Story</h1>
            <div className="stories">
              <div className="story"></div>
            </div>
          </div>}

          {display === 'user' && <div>
            <h1>Edit your profile</h1>
            <div className="stories">
              <div className="story"></div>
            </div>
          </div>}

        </div>
    </div>
  )
}

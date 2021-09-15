import React, { useState } from 'react'
import Story from 'components/Story'
import UserHeader from 'components/UserHeader'

export default function UserPage() {
  const [display, setDisplay] = useState ('story')
  
  return (
    <div className="user-page">

      <UserHeader />

        <div className="body">

          {display === 'story' && <div>
            <h1>Stories</h1>
            <div className="stories">
              <Story />
              <Story />
              <Story />
              <Story />
              <Story />
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

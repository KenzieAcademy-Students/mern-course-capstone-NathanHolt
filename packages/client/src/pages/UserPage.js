import React, { useState } from 'react'
import Story from 'components/Story'
import UserHeader from 'components/UserHeader'
import StoryForm from 'components/StoryForm'
import UserEditor from 'components/UserEditor'

export default function UserPage() {
  const [display, setDisplay] = useState ('story')
  
  return (
    <div className="user-page">

      <UserHeader displayer={(value) => setDisplay(value)} />

        <div className="body">

          {display === 'story' && <div>
            <h1>Stories</h1>
            <div className="stories">
              <Story />
              <Story />
              <Story />
              <Story />
            </div>
          </div>}

          {display === 'story-form' && <div>
            <StoryForm />
          </div>}

          {display === 'user' && <div>
            <UserEditor />
          </div>}

        </div>
    </div>
  )
}

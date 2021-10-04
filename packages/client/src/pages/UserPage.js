import React, { useState } from 'react'
import Story from 'components/Story'
import UserHeader from 'components/UserHeader'
import StoryForm from 'components/StoryForm'
import UserEditor from 'components/UserEditor'

export default function UserPage() {
  const [display, setDisplay] = useState('story')
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div className='user-page'>
      <UserHeader displayer={(value) => setDisplay(value)} />

      <div className='body'>
        {display === 'story' && (
          <div>
            <div className='stories'>
              {!user.storyboard && <h1>No Stories</h1>}
              {user.storyboard &&
                user.storyboard.map((story) => (
                  <Story name={story.name} description={story.description} />
                ))}
            </div>
          </div>
        )}

        {display === 'story-form' && (
          <div>
            <StoryForm />
          </div>
        )}

        {display === 'user' && (
          <div>
            <UserEditor />
          </div>
        )}
      </div>
    </div>
  )
}

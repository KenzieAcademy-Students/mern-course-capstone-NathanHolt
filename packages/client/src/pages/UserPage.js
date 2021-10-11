import React, { useState, useEffect } from 'react'
import Story from 'components/Story'
import UserHeader from 'components/UserHeader'
import StoryForm from 'components/StoryForm'
import UserEditor from 'components/UserEditor'
import axios from 'axios'

export default function UserPage() {
  const [display, setDisplay] = useState('story')
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  
  useEffect(async () => {
    const newInfo = await axios.get(`/api/dev/user/${user.username}`)
    console.log(newInfo.data)
    setUser(newInfo.data)
  }, [])
  
  return (
    <div className='user-page'>
      <UserHeader displayer={(value) => setDisplay(value)} />

      <div className='body'>
        {display === 'story' && (
          <div>
            <div className='stories'>
              {user && !user.storyboard.length && <h1>No Stories</h1>}
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

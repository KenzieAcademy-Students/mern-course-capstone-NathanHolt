import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useApiFetch } from 'util/api'
import LoadingSpinner from 'components/LoadingSpinner'
import Button from 'react-bootstrap/Button'

export default function HomePage(props) {
  // const {error, isLoading, response} = useApiFetch("/sample")
  const history = useHistory()

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user) history.push(`/user/${user.username}`)
  }, [])

  return (
    <div className='home'>
      <div className='content'>
        <div className='intro section'>
          <div className='twist'>
            <h1>This is ParallelPaths</h1>
            <h3>
              <b>The</b> Premier Timeline App
            </h3>
            <p>
              There are other planning and day organization apps, google
              calendar, but what are doing differently is that we allow for
              multiple people to be tracked at once. This could be used by
              authors to keep track of continuity of all of the characters in
              their stories. It could also be used by managers to help team
              productivity in an agile workplace/remote workplace, especially
              when the team members are in different timezones.
            </p>
            <h3>What are you waiting for?</h3>
            <div className='d-grid gap-2'>
              <Button
                size='lg'
                variant='outline-primary'
                onClick={() => history.push('/log')}
              >
                Sign In/Up
              </Button>
            </div>
          </div>
        </div>
        <div className='info anti section'>
          <div className='anti-twist'>
            <h3>The App</h3>
            <div className='feature'>
              <img alt='Timeline' src='../../ender.png' />
              <p>
                Display you characters and compare their actions with each other. Create as many characters as you want and add their actions to the timeline!
              </p>
            </div>
          </div>
        </div>
        <div className='info section'>
          <div className='twist'>
            <div className='feature'>
              <p>
                Create and delete stories at you leisure! Make and edit as many as you want!
              </p>
              <img className='member'  alt='Compare' src='../../home.png' />
            </div>
          </div>
        </div>
        <div className='info anti section'>
          <div className='anti-twist'>
            <div className='feature'>
              <img className='member'  alt='Neat' src='../../create.png' />
              <p>
                This is the story creation form. Add a title and a description to you stories!
              </p>
            </div>
          </div>
        </div>
        <div className='about section'>
          <div className='twist'>
            <h3>Our Team</h3>
            <ul>
              <li>
                <div className='member-text'>
                  <h5>
                    Nick Lai - <em>QA Tester</em>
                  </h5>
                  <p>
                    A champion of the backend. He was the team's spectacular QA tester. Without this flexible dev this project would not have been completed.
                  </p>
                </div>
                <img alt='beauty shot' src='../../20211015_164410.jpg' />
              </li>
              <li>
                <img alt='beauty shot' src='../../20210908_183224.jpg' />
                <div className='member-text'>
                  <h5>
                    Jeffrey Benjamin - <em>Backend Dev</em>
                  </h5>
                  <p>
                    Another amazing backend dev! His commitment to the project was astounding. The beating heart of this team.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className='about anti section'>
          <div className='anti-twist'>
            <ul>
              <li>
                <div className='member-text'>
                  <h5>
                    Kevin Gomez - <em>Front End Dev</em>
                  </h5>
                  <p>
                    A spectacular front end developer! He worked and hard and prevailed though it all.
                  </p>
                </div>
                <img className='member' src='../../kevin.jpg' alt='beauty shot' />
              </li>
              <li>
                <img src='../../WIN_20210128_18_36_42_Pro.jpg' className='member'  alt='beauty shot' />
                <div  className='member-text'>
                  <h5>
                    Anthony Klein - <em>SCRUM Master</em>
                  </h5>
                  <p>
                    A dev who worked primarily on the front end of the project. He also is an astounding graphic designer who made out logo!
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className='about section'>
          <div className='twist'>
            <ul>
              <li>
                <div className='member-text'>
                  <h5>
                    Nathan Holt - <em>Product Owner</em>
                  </h5>
                  <p>
                    This dev leaned more into the fullstack position for this project and filled in where he was needed. A real Mr FixIt!
                  </p>
                </div>
                <img className='member'  alt='beauty shot' src='../../profile.png' />
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* { !error && response && (
        <div>Username: {response.username}</div>
      )} */}
    </div>
  )
}

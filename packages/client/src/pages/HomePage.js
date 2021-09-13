import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { useApiFetch } from "util/api"
import LoadingSpinner from 'components/LoadingSpinner'
import Button from 'react-bootstrap/Button'

export default function HomePage(props) {
  const {error, isLoading, response} = useApiFetch("/sample")
  const history = useHistory()

  useEffect(() => {
    let user = localStorage.getItem("user")
    if (user) {
      history.push(`/user/${user}`)    }
  }, [])

  
  return ( 
    <div className='home'>
      <div className='content'>
        <div className="intro section">
          <div className='twist'>
            <h1>This is ParallelPaths</h1>
            <h3>This is <b>the</b> premier timeline app</h3>
            <p>There are other planning and day organization apps, google calendar, but what are doing differently is that we allow for multiple people to be tracked at once. This could be used by authors to keep track of continuity of all of the characters in their stories. It could also be used by managers to help team productivity in an agile workplace/remote workplace, especially when the team members are in different timezones.</p>
            <h3>What are you waiting for?</h3>
            <Button variant="outline-primary" onClick={() => history.push("/log")}>Sign In/Up</Button>
          </div>
        </div>
        <div className="info section">
          <div className='anti-twist'>
            <h3>Any Questions?</h3>
            <div className="feature">
              <img alt="Timeline"/>
              <p>Look at this neat feature</p>
            </div>
            <div className="feature">
              <p>Look at this neat feature</p>
              <img alt="Compare"/>
            </div>
            <div className="feature">
              <img alt="Add paths"/>
              <p>Look at this neat feature</p>
            </div>      
          </div>
        </div>
        <div className="about section">
          <div className='twist'>
            <h3>Our Team</h3>
            <ul>
              <li>
                <h5>Nathan Holt</h5>
                <p>Blurb (Person can write their )</p>
              </li>
              <li>
                <h5>Jeffrey Benjamin</h5>
                <p>Blurb (Person can write their )</p>
              </li>
              <li>
                <h5>Nic Lai</h5>
                <p>Blurb (Person can write their )</p>
              </li>
              <li>
                <h5>Anthony Klein</h5>
                <p>Blurb (Person can write their )</p>
              </li>
              <li>
                <h5>Kevin Gomez</h5>
                <p>Blurb (Person can write their )</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      { error && <h3 style={{color:"red"}}>Error Loading Data: {error}</h3>}
      { isLoading &&  <LoadingSpinner></LoadingSpinner>}
      {/* { !error && response && (
        <div>Username: {response.username}</div>
      )} */}
    </div>
  )
}

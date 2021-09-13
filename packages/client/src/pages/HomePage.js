import React, {  useEffect } from 'react'
import { useApiFetch } from "util/api"
import LoadingSpinner from 'components/LoadingSpinner'
import Button from 'react-bootstrap/Button'

export default function HomePage(props) {
  const {error, isLoading, response} = useApiFetch("/sample")

  useEffect(() => {
    let user = localStorage.getItem("user")
    if (user) {
      console.log(`redirect to ${user}`)
    }
  }, [])

  const handleSignIn = () => {
    console.log('redirect to sign in')
  }
  
  return ( 
    <main>
      <div className="intro">
        <h1>This is ParallelPaths</h1>
        <h3>This the premier timeline app</h3>
        <p>There are other planning and day organization apps, google calendar, but what are doing differently is that we allow for multiple people to be tracked at once. This could be used by authors to keep track of continuity of all of the characters in their stories. It could also be used by managers to help team productivity in an agile workplace/remote workplace, especially when the team members are in different timezones.</p>
        <h3>What are you waiting for?</h3>
        <Button variant="outline-info" onClick={() => handleSignIn()}>Sign In/Up</Button>
      </div>
      { error && <h3 style={{color:"red"}}>Error Loading Data: {error}</h3>}
      { isLoading &&  <LoadingSpinner></LoadingSpinner>}
      {/* { !error && response && (
        <div>Username: {response.username}</div>
      )} */}
    </main>
  )
}

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
            <div className="d-grid gap-2">
              <Button size="lg" variant="outline-primary" onClick={() => history.push("/log")}>Sign In/Up</Button>
            </div>
          </div>
        </div>
        <div className="info anti section">
          <div className='anti-twist'>
            <h3>Any Questions?</h3>
            <div className="feature">
              <img alt="Timeline"/>
              <p>I'm baby fashion axe coloring book mustache flannel bespoke kogi farm-to-table activated charcoal seitan fam biodiesel YOLO. Iceland wayfarers before they sold out unicorn leggings, farm-to-table la croix VHS. Skateboard iPhone twee, leggings offal sartorial actually VHS echo park cliche poke occupy ethical. Hexagon four loko la croix brunch pinterest af. Activated charcoal asymmetrical DIY post-ironic raclette, narwhal deep v. </p>
            </div>    
          </div>
        </div>
        <div className="info section">
          <div className='twist'>
            <div className="feature">
              <p>Franzen readymade seitan, tbh swag snackwave ennui bicycle rights la croix microdosing +1 bespoke shabby chic banh mi. Blog four loko kickstarter freegan. Bitters mumblecore kogi synth, VHS wayfarers scenester taiyaki pabst tilde tousled humblebrag franzen austin. 3 wolf moon jianbing leggings, kickstarter tote bag hell of helvetica. Humblebrag knausgaard pabst selvage gluten-free, tousled unicorn.</p>
              <img alt="Compare"/>
            </div>    
          </div>    
        </div> 
        <div className="info anti section">
          <div className='anti-twist'>
            <div className="feature">
              <img alt="Neat"/>
              <p> Narwhal cray blog gluten-free polaroid. Aesthetic listicle whatever tousled beard. Air plant craft beer waistcoat copper mug mlkshk ethical. Cardigan subway tile salvia literally, distillery godard squid cray. Biodiesel sartorial subway tile vice, etsy pitchfork seitan single-origin coffee coloring book disrupt kombucha YOLO roof party dreamcatcher locavore.</p>
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
            </ul>
          </div>
        </div>
        <div className="about anti section">
          <div className='anti-twist'>
            <ul>
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

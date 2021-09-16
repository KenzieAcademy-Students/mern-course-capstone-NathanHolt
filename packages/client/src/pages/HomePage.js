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
      history.push(`/user/${user}`)
      }
  }, [])

  
  return ( 
    <div className='home'>
      <div className='content'>
        <div className="intro section">
          <div className='twist'>
            <h1>This is ParallelPaths</h1>
            <h3><b>The</b> Premier Timeline App</h3>
            <p>There are other planning and day organization apps, google calendar, but what are doing differently is that we allow for multiple people to be tracked at once. This could be used by authors to keep track of continuity of all of the characters in their stories. It could also be used by managers to help team productivity in an agile workplace/remote workplace, especially when the team members are in different timezones.</p>
            <h3>What are you waiting for?</h3>
            <div className="d-grid gap-2">
              <Button size="lg" variant="outline-primary" onClick={() => history.push("/log")}>Sign In/Up</Button>
            </div>
          </div>
        </div>
        <div className="info anti section">
          <div className='anti-twist'>
            <h3>The App</h3>
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
                <div className='member-text'>
                  <h5>Nick Lai - <em>Position</em></h5>
                  <p>Blurb (Person can write their ) Pork belly freegan knausgaard activated charcoal listicle photo booth salvia pinterest jean shorts skateboard chia.</p>
                </div>
                <img alt="beauty shot"/>
              </li>
              <li>
                <img alt="beauty shot"/>
                <div className='member-text'>
                  <h5>Jeffrey Benjamin - <em>Position</em></h5>
                  <p> Lyft yr portland, +1 distillery put a bird on it jianbing paleo blog tousled ennui chillwave lumbersexual. Franzen fanny pack drinking vinegar, PBRB fixie biodiesel flexitarian coloring book. </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="about anti section">
          <div className='anti-twist'>
            <ul>
              <li>
                <div className='member-text'>
                  <h5>Kevin Gomez - <em>Position</em></h5>
                  <p> Cold-pressed copper mug distillery etsy next level irony. Chambray letterpress stumptown, post-ironic four dollar toast gochujang XOXO schlitz banjo poke ethical knausgaard. </p>
                </div>
                <img alt="beauty shot"/>
              </li>
              <li>
                <img alt="beauty shot"/>
                <div className='member-text'>
                  <h5>Anthony Klein - <em>Position</em></h5>
                  <p>Af forage polaroid, bitters shoreditch raw denim bicycle rights chambray selfies. Marfa cray flannel, cloud bread swag pickled meditation. VHS +1 letterpress chia gluten-free taiyaki. </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="about section">
          <div className='twist'>
            <ul>
              <li>
                <div className='member-text'>
                  <h5>Nathan Holt - <em>Position</em></h5>
                  <p>I'm baby keytar schlitz pitchfork flexitarian synth stumptown meggings jean shorts, retro viral. Gentrify whatever hella etsy mlkshk readymade locavore vegan.</p>
                </div>
                <img alt="beauty shot"/>
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

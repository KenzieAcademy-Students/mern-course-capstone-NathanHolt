import React from 'react'
import { useHistory } from "react-router-dom";
import './Story.css'

export default function Story(props) {

  let history = useHistory();

  function handleClick() {
    history.push(`/story/${props.name} `);
  }


    return (
        <div>
            <div onClick={handleClick} className="story"

            >
              <h2>{props.name}</h2>

              
             <p>{props.description}</p>
            </div>


            
      Go to story 
    
        </div>
    )
}

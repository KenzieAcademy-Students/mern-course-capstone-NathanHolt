import React from 'react'
import Action from 'components/Action'
import './Character.css'

export default function Character(props) {
    const { test } = props

    const renderActions = (num) => {
        let acts = []
        for (let i = 0; i < num; i++) {
            let storyLength = 10 * num
            let unit = 100 / storyLength 
            acts.push(<Action 
                    total={storyLength} 
                    position={unit * (i * 10) <= 100 ? unit * (i * 10) : unit} 
                    length={unit * (i * 3) < 3 ? 3 : unit * (i * 3)} 
                    title="Tester"  
                    text="I'm baby jean shorts asymmetrical lo-fi, flexitarian hashtag copper mug PBRB umami wolf unicorn aesthetic forage tofu chia. Selfies lumbersexual whatever roof party slow-carb. Poutine unicorn taiyaki, ennui locavore cliche live-edge. Hammock copper mug beard food truck." 
                    />)
        }
        return acts 
    }
    
    return (
        <div className="line">
            <div className="character">
                {renderActions(test)}
            </div>
        </div>
    )
}

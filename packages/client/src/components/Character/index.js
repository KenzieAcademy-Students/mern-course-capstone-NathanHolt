import React from 'react'
import Action from 'components/Action'
import './Character.css'

export default function Character(props) {
    const { test, data } = props

    const renderActions = (num) => {
        let acts = []
        console.log(data)
        for (let i = 0; i < data.paths.length; i++) {
            let storyLength = 10 * num
            let unit = 100 / storyLength 
            acts.push(<Action 
                    total={storyLength} 
                    position={unit * (i * 15) <= 100 ? unit * (i * 10) : unit} 
                    length={unit * (i * 5) < 3 ? 3 : unit * (i * 3)} 
                    title={data.paths[i].name}  
                    text={data.paths[i].description} 
                    />)
        }
        return acts 
    }
    
    return (
        <div className="line">
            <div className="character">
                {data.paths && renderActions(test)}
            </div>
        </div>
    )
}

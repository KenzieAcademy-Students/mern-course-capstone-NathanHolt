import React from 'react'
import Action from 'components/Action'
import LogOutBtn from 'components/LogOutBtn'


export default function TesterN() {

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
        <div className="test-n">
            <h1>Nathan's component testing stage</h1>
            <div className="test-row">
            <div className="action-test">
                {renderActions(8)}
            </div>
            <div className="action-test">
                {renderActions(5)}
            </div>
            </div>
            <LogOutBtn />
        </div>
    )
}

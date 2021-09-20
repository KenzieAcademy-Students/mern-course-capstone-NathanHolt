import React from 'react'
import Action from 'components/Action'
import LogOutBtn from 'components/LogOutBtn'


export default function TesterN() {

    const renderActions = (num) => {
        let acts = []
        for (let i = 0; i < num; i++) {
            let unit = 100 / (num * 2) // length of the story
            acts.push(<Action total={num} position={unit * (i * 1.5)} title="Tester"  length={unit} text="I'm baby jean shorts asymmetrical lo-fi, flexitarian hashtag copper mug PBRB umami wolf unicorn aesthetic forage tofu chia. Selfies lumbersexual whatever roof party slow-carb. Poutine unicorn taiyaki, ennui locavore cliche live-edge. Hammock copper mug beard food truck." />)
        }
        return acts
    }
    
    return (
        <div className="test-n">
            <h1>Nathan's component testing stage</h1>
            <div className="action-test">
                {renderActions(8)}
            </div>
            <div className="action-test">
                {renderActions(3)}
            </div>
            <LogOutBtn />
        </div>
    )
}

import React from 'react'
import Action from 'components/Action'


export default function TesterN() {

    const renderActions = (num) => {
        let acts = []
        for (let i = 0; i < num; i++) {
            acts.push(<Action title="Tester"  length='2min' text="I'm baby jean shorts asymmetrical lo-fi, flexitarian hashtag copper mug PBRB umami wolf unicorn aesthetic forage tofu chia. Selfies lumbersexual whatever roof party slow-carb. Poutine unicorn taiyaki, ennui locavore cliche live-edge. Hammock copper mug beard food truck." />)
        }
        return acts
    }
    
    return (
        <div className="test-n">
            <h1>Nathan's component testing stage</h1>
            <div className="action-test">
                {renderActions(8)}
            </div>
        </div>
    )
}

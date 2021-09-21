import React, { useState } from 'react'
import StoryHeader from 'components/StoryHeader'
import Character from 'components/Character'


export default function StoryPage() {
    const [question, setQuestion] = useState ('')
    
    return (
        <div className="story-page">
            <div className="story-header">
                <StoryHeader displayer={(e) => setQuestion(e)} />
            </div>
            <div className="story-body">
                <div className="story-sidebar">sidebar to add/manipulate characters</div>
                <div className="story-main">
                    <div className="story-line">timeline</div>
                    <Character test={5} />
                    <Character test={8} />
                    <Character test={3} />
                </div>
            </div>
        </div>
    )
}

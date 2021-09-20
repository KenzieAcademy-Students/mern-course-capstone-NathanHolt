import React, { useState } from 'react'
import StoryHeader from 'components/StoryHeader'

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
                    <div className="story-character"></div>
                    <div className="story-character"></div>
                    <div className="story-character"></div>
                </div>
            </div>
        </div>
    )
}

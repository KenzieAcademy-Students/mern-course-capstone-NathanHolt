import LogOutBtn from 'components/LogOutBtn'
import Sidebar from 'components/StoryPageSideBar'
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
                <div className="story-sidebar"><Sidebar></Sidebar></div>
                <div className="story-main">
                    <div className="story-line">
                        {/* <h1>Back</h1> */}
                        {/* <h1>Zoom</h1> */}
                        <h1>Timeline</h1>
                        {/* <h1>Zoom out</h1> */}
                        {/* <h1>Forward</h1> */}
                    </div>
                    <Character test={0} />
                    <Character test={8} />
                    <Character test={3} />
                    <Character test={0} />
                    <Character test={8} />
                    <Character test={3} />
                    <Character test={0} />
                    <Character test={8} />
                    <Character test={3} />
                    <Character test={0} />
                    <Character test={8} />
                    <Character test={3} />
                </div>
            </div>
        </div>
    )
}

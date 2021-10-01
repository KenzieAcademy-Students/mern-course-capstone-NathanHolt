import Sidebar from 'components/StoryPageSideBar'
import React, { useState, useEffect } from 'react'
import StoryHeader from 'components/StoryHeader'
import Character from 'components/Character'
import { useUser } from 'hooks'



export default function StoryPage() {
    const { returnState } = useUser()
    const [question, setQuestion] = useState ('')
    const [state, setState] = useState({})


    useEffect(() => {
        setState(returnState())
    }, [])

    const displayCharacter = () => {
        let characters = []
        for (let i = 0; i < state.characters.length; i++) {
            characters.push(<Character index={i} data={state.characters[i]} test={i + 1} />)
        }
        return characters
    }

    
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
                    {state.characters && displayCharacter()}
                </div>
            </div>
        </div>
    )
}

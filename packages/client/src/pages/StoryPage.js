import Sidebar from 'components/StoryPageSideBar'
import React, { useState, useEffect } from 'react'
import StoryHeader from 'components/StoryHeader'
import Character from 'components/Character'
import axios from 'axios'
import { useParams } from "react-router-dom"
import { useUser } from 'hooks'

export default function StoryPage() {
    const { name } = useParams()
    const { returnState, initialSet } = useUser()
    const [question, setQuestion] = useState ('')
    const [state, setState] = useState({})


    useEffect(async () => {
        const newInfo = await axios.get(`/api/dev/story/characters/${name}`)
        await initialSet(newInfo.data)
        setState(newInfo.data)

        // return () => {
        //     initialSet({
        //         name: '',
        //         author: '',
        //         created: 0,
        //         storyId: null,
        //         characters: [],
        //     })
        // }
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

                        <h1>{state.name}</h1>
                        <div className="line-box">
                            <div className="line-left"></div>
                            <div className="line-line"></div>
                            <div className="line-right"></div>
                        </div>

                    </div>
                    {state.characters && displayCharacter()}
                </div>
            </div>
        </div>
    )
}

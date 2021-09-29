import React, { useEffect } from 'react'
import LogOutBtn from 'components/LogOutBtn'
import PathForm from 'components/PathForm'
import CharacterForm from 'components/CharacterForm'
import { useUser } from 'hooks'

export default function TesterN() {
    // const { saveProgress, addCharacter, initialSet } = useUser()

    // const print = () => {
    //     addCharacter('whyyyyy')
    // }

    // useEffect(() => {
    //     initialSet()

    //     return () => saveProgress()
    // }, [])
    
    return (
        <div className="test-n">
            <h1>Nathan's component testing stage</h1>
            {/* <button onClick={() => saveProgress()}>Save Test</button>
            <button onClick={() => print()}>Test</button> */}
            <PathForm />
            <CharacterForm />
            <LogOutBtn />
        </div>
    )
}

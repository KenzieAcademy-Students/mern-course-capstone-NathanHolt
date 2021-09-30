import React, { useEffect, useState } from 'react'
import LogOutBtn from 'components/LogOutBtn'
import PathForm from 'components/PathForm'
import CharacterForm from 'components/CharacterForm'
import Character from 'components/Character'
import { useUser } from 'hooks'

export default function TesterN() {
    const { returnState } = useUser()
    const [state, setState] = useState({})


    useEffect(() => {
        setState(returnState())
    }, [])

    const displayCharacter = () => {
        let characters = []
        for (let i = 0; i < state.characters.length; i++) {
            characters.push(<Character data={state.characters[i]} test={i + 1} />)
        }
        return characters
    }
    
    return (
        <div className="test-n">
            <h1>Nathan's component testing stage</h1>
            {/* <button onClick={() => saveProgress()}>Save Test</button>
            <button onClick={() => print()}>Test</button> */}
            <PathForm />
            <CharacterForm />
            <LogOutBtn />
            <div>
                {state.characters && displayCharacter()}
            </div>
        </div>
    )
}

import React from 'react'
import Character from 'components/Character'
import LogOutBtn from 'components/LogOutBtn'


export default function TesterN() {
    
    return (
        <div className="test-n">
            <h1>Nathan's component testing stage</h1>
            <Character test={5} />
            <Character test={8} />
            <LogOutBtn />
        </div>
    )
}

import React from 'react'
import { useHistory } from "react-router-dom";
import datapirates from './datapirates.png'
import './Logo.css'

export default function Logo() {
    const history = useHistory()

    const handleClick = () => {
        history.push('/')
    }
    
    return (
        <div className='logo' onClick={() => handleClick()} >
            <img className='pirate' src={datapirates} />
        </div>
    )
}

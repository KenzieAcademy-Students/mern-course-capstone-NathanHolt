import React from 'react'
import { useHistory } from "react-router-dom";

export default function Logo() {
    const history = useHistory()

    const handleClick = () => {
        history.push('/')
    }
    
    return (
        <div className='logo' onClick={() => handleClick()} >
            <img />
        </div>
    )
}

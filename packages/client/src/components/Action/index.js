import React from 'react'
import './Action.css'

export default function Action(props) {

    const { title, length, text } = props 
    
    return (
        <div className="action">
            <div className="title">
                <h3>{title}</h3>
                <h4>{length}</h4>
            </div>
            <div className="desc">
                <p>{text}</p>
            </div>
        </div>
    )
}

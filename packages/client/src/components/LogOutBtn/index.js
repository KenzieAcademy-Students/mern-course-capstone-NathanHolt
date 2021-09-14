import React from 'react'
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";

export default function LogOutBtn() {
    const history = useHistory()

    const handleClick = () => {
        localStorage.setItem("user", "")
        history.push('/')
    }
    
    return (
        <div>
            <Button variant="outline-danger">Log Out</Button>
        </div>
    )
}

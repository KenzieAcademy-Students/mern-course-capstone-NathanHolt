import { render } from '@testing-library/react';
import React from 'react'
import './StoryForm.css'

export default function StoryForm() {
    constructor(props) {
    super(props);
    this.state = {value:''}
    this.handleChamge = this.handleChange.bind(this);
    this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('a name was submitted:' +this.state.value);
        event.preventDefault();
    }
    render(){
        return (
            <form onSubmit= {this.handleSubmit}>
            <label>
                Name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
            </form>
        )
    }
    
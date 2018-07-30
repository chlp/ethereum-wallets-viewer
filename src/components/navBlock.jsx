import React, { Component } from 'react'
import HiddenBlock from './hiddenBlock.jsx'
const uuidv4 = require('uuid/v4')


class NavBlock extends Component {
    constructor(props) {
        super(props)

        this.state = {
            history: true,
            tokens: false
        }
    }

    render() {
        return (
            <div className="part_two">
                <div className="nav">
                    <p onClick = {this.toggleHistory}>Hisrory</p>
                    <p onClick = {this.toggleTokens}>Tokens</p>
                </div>
                <div className="additionalContent">
                    {this.getHistory()}
                    {this.getTokens()}
                </div>
            </div>
        )
    }

    getHistory = () => {
        if(!this.state.history) return null
        return <HiddenBlock items = {this.props.item} />
    }

    getTokens = () => {
        if(!this.state.tokens) return null
        return (
            <ul>
                <li className="info">
                    <p>Changes in the tokens will be displayed here.</p>
                </li>
            </ul>
        )
    }

    toggleHistory = () => {
        if(!this.state.hisrory) {
            this.setState({
                history: true,
                tokens: false
            })
        }
    }

    toggleTokens = () => {
        if(!this.state.tokens) {
            this.setState({
                tokens: true,
                history: false
            })
        }
    }
}

export default NavBlock

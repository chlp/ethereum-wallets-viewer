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

    componentDidMount() {
        if(this.state.history) {
            this.opacityNav.history.style.color = "#0F2445"
        } else {
            this.opacityNav.tokens.style.color = "#0F2445"
        }
    }

    render() {
        return (
            <div className="part_two">
                <div className="nav">
                    <p ref = {this.setOpacity} onClick = {this.toggleHistory}>History</p>
                    <p ref = {this.setOpacity} onClick = {this.toggleTokens}>Tokens</p>
                </div>
                <div className="additionalContent">
                    {this.getHistory()}
                    {this.getTokens()}
                </div>
            </div>
        )
    }

    setOpacity = ref => {
        if(!ref) return null
        this.opacityNav = Object.assign({}, this.opacityNav, {
            [ref.textContent.toLowerCase()]: ref
        })
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
        if(!this.state.history) {
            this.setState({
                history: true,
                tokens: false
            })
            this.opacityNav.history.style.color = "#0F2445"
            this.opacityNav.tokens.style.color = ""
        }
    }

    toggleTokens = () => {
        if(!this.state.tokens) {
            this.setState({
                tokens: true,
                history: false
            })
            this.opacityNav.tokens.style.color = "#0F2445"
            this.opacityNav.history.style.color = ""
        }
    }
}

export default NavBlock

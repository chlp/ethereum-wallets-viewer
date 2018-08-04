import React, { Component } from 'react'
import HiddenBlock from './hiddenBlock.jsx'
import TokensBlock from './tokensBlock.jsx'
const uuidv4 = require('uuid/v4')


class NavBlock extends Component {
    constructor(props) {
        super(props)

        this.state = {
            history: true,
            tokens: false,
            tokensPage: 1,
            lastTokensPage: 1
        }
    }

    componentDidMount() {
        let {history, tokensPage} = this.state
        let {tokens} = this.props.item

        if(history) {
            this.opacityNav.history.style.color = "#0F2445"
            this.additionalContent.className = "additionalContentHistory"
        } else {
            this.opacityNav.tokens.style.color = "#0F2445"
            this.additionalContent.className = "additionalContentTokens"
        }

        if(tokens) {
            let lastPage = Math.ceil(tokens.length/10)
            this.setState({
                lastTokensPage: lastPage
            })
        }
    }

    render() {
        return (
            <div className="part_two">
                <div className="nav">
                    <p ref = {this.setOpacity} onClick = {this.toggleHistory}>History</p>
                    <p ref = {this.setOpacity} onClick = {this.toggleTokens}>Tokens</p>
                </div>
                <div ref = {this.setClassName}>
                    {this.getHistory()}
                    {this.getTokens()}
                    {this.toggleButton()}
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
        return (
            <HiddenBlock items = {this.props.item} />
        )
    }

    getTokens = () => {
        if(!this.state.tokens) return null
        let {tokensPage} = this.state
        let {account, tokens} = this.props.item

        if(tokens.length) {
            let tokensSampleArr = tokens.slice((tokensPage*10)-10, (tokensPage*10));
            return (
                <TokensBlock tokenList = {tokensSampleArr} account = {account}/>
            )
        } else {
            console.log("hello")
            return (
                <li className="info" key = {uuidv4()}>
                    <p>Changes in the tokens will be displayed here.</p>
                </li>
            )
        }
    }

    toggleButton = () => {
        if(!this.state.tokens) return null

        let {tokensPage, lastTokensPage} = this.state
        let {tokens} = this.props.item

        return (
            <div className="switchButton">
                {tokensPage > 1 ? <p className="prev" onClick = {this.prevPageTokens}>Prev</p> : null}
                {lastTokensPage > tokensPage ? <p className="next" onClick = {this.nextPageTokens}>Next</p> : null}
            </div>
        )
    }

    nextPageTokens = () => {
        this.setState({
            tokensPage: this.state.tokensPage + 1
        })
    }

    prevPageTokens = () => {
        this.setState({
            tokensPage: this.state.tokensPage - 1,
        })
    }

    setClassName = ref => {
        this.additionalContent = ref
    }

    toggleHistory = () => {
        if(!this.state.history) {
            this.setState({
                history: true,
                tokens: false
            })
            this.additionalContent.className = "additionalContentHistory"
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
            this.additionalContent.className = "additionalContentTokens"
            this.opacityNav.tokens.style.color = "#0F2445"
            this.opacityNav.history.style.color = ""
        }
    }
}

export default NavBlock

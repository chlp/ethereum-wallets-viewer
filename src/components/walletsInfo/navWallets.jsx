import React, { Component } from 'react'
import ListHistory from '../historyInfo/listHistory.jsx'
import SamTokens from '../tokensInfo/samTokens.jsx'

export default class NavWallets extends Component {
    constructor(props) {
        super(props)

        this.state = {
            history: true,
            tokens: false
        }
    }

    componentDidMount() {
        let {history} = this.state

        if(history) {
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
                {this.getHistory()}
                {this.getTokens()}
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
            <div className="additionalContentHistory">
            <ListHistory items = {this.props.item} />
            </div>
        )
    }

    getTokens = () => {
        if(!this.state.tokens) return null
        let {account, tokens} = this.props.item

        return (<SamTokens tokens = {tokens} account = {account}/>)
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

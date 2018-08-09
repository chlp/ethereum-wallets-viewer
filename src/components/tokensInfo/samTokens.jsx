import React, {Component} from 'react'
import ListTokens from './listTokens.jsx'
const uuidv4 = require('uuid/v4')

export default class samTokens extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tokensPage: 1,
            lastTokensPage: 1
        }
    }

    componentDidMount() {
        let {lastTokensPage} = this.state
        let {tokens} = this.props

        if(this.props.tokens) {
            let lastPage = Math.ceil(tokens.length/10)
            this.setState({
                lastTokensPage: lastPage
            })
        }
    }

    render() {
        let {tokensPage, lastTokensPage} = this.state
        let {tokens} = this.props

        return(
            <div className="additionalContentTokens">
                {this.getTokensList(tokensPage, tokens)}
                <div className="switchButton">
                    {tokensPage > 1 ? <p className="prev" onClick = {this.prevPageTokens}>Prev</p> : null}
                    {lastTokensPage > tokensPage ? <p className="next" onClick = {this.nextPageTokens}>Next</p> : null}
                </div>
            </div>
        )
    }

    getTokensList = (tokensPage, tokens) => {
        let {account} = this.props

        if(tokens.length) {
            let tokensSampleArr = tokens.slice((tokensPage*10)-10, (tokensPage*10));
            return (
                <ListTokens tokenList = {tokensSampleArr} account = {account}/>
            )
        } else {
            return (
                <li className="info" key = {uuidv4()}>
                    <p>Changes in the tokens will be displayed here.</p>
                </li>
            )
        }

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
}

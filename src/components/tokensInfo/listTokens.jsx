import React from 'react'
import ElemTokens from './elemTokens.jsx'
const uuidv4 = require('uuid/v4')

const listTokens = (props) => {

    let blocks = props.tokenList.map((item, i) => {
        return (<ElemTokens item = {item} account = {props.account} key = {uuidv4()}/>)
    })

    return (
        <ul>{blocks}</ul>
    )
}

export default listTokens

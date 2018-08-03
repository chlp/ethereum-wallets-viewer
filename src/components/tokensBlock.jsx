import React from 'react'
import TokensList from './tokensList.jsx'
const uuidv4 = require('uuid/v4')

const getList = (props) => {

    let blocks = props.tokenList.map((item, i) => {
        return (<TokensList item = {item} account = {props.account} key = {uuidv4()}/>)
    })

    return (
        <ul>{blocks}</ul>
    )
}

export default getList

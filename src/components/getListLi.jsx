import React from 'react'
import ListLi from './ListLi.jsx'
const uuidv4 = require('uuid/v4')

const getListI = ({items}) => {
    let blocks = items.history.reverse().map((item, i) => {
        return (<ListLi item = {item} balance = {items.balance} key = {uuidv4()}/>)
    })
    return (
        <div className="part_two"><ul>{blocks}</ul></div>
    )
}

export default getListI

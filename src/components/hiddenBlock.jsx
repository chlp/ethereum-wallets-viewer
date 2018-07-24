import React from 'react'
import HistoryList from './historyList.jsx'
const uuidv4 = require('uuid/v4')

const getListI = ({items}) => {
    let blocks = items.history.map((item, i) => {
        if (i > 0) {
            return (<HistoryList item = {item} balance = {item.balance} lastBalance = {items.history[i-1].balance} key = {uuidv4()}/>)
        }
    })
    return (
        <div className="part_two"><ul>{blocks.reverse()}</ul></div>
    )
}

export default getListI

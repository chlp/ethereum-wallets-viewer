import React from 'react'
import HistoryList from './historyList.jsx'
const uuidv4 = require('uuid/v4')

const getListI = ({items}) => {

    let blocks = items.history.map((item, i) => {
        if(items.history.length > 1) {
            if (i > 0) {
                return (<HistoryList item = {item} balance = {item.balance} lastBalance = {items.history[i-1].balance} key = {uuidv4()}/>)
            }
        } else  {
            return (
            <li className="info" key = {uuidv4()}>
                <p>Changes in the balance will be displayed here.</p>
            </li>
            )
        }
    })

    return (
        <div className="part_two"><hr/><ul>{blocks.reverse()}</ul></div>
    )
}

export default getListI

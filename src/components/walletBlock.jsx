import React from 'react'
import Wallet from './wallet.jsx'

const WalletBlock = ({items}) => {
    let blocks = items.map((item) => {
        return (<Wallet item = {item} key = {item.account}/>)
    })
    return (
        <div className="grid">{blocks}</div>
    )
}

export default WalletBlock

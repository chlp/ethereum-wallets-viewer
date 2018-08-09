import React, {Component} from 'react'
import ElemWallets from './elemWallets.jsx'

export default function ListWallets ({wallets}){

    return (
        <div className="grid">
            {wallets.map((item) => {
                return (
                    <ElemWallets item = {item} key = {item.account}/>
                )
            })}
        </div>
    )
    
}

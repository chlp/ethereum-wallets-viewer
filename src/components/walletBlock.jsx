import React, {Component} from 'react'
import Wallet from './wallet.jsx'

class WalletBlock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="grid">{this.blocks()}</div>
        )
    }

    blocks = () => {
        return this.props.items.map((item) => {
            return (<Wallet item = {item} key = {item.account}/>)
        })
    }
}

export default WalletBlock

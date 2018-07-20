import React, {Component} from 'react'
import {connect} from 'react-redux'
import {itemsFetchData, itemsFirstLoading} from '../redux/actions/items'
import {wallet} from '../data/wallet.js'
import WalletBlock from './walletBlock.jsx'

class ItemList extends Component {
    componentDidMount() {
        if(this.props.isLoading) {
            let str = (wallet.map((item) => {return item.account})).join(',')
            this.props.fetchData(`https://api.etherscan.io/api?module=account&action=balancemulti&address=${str}&tag=latest`)
        };
        setInterval(() => {
            let str = (wallet.map((item) => {return item.account})).join(',')
            this.props.fetchData(`https://api.etherscan.io/api?module=account&action=balancemulti&address=${str}&tag=latest`)
        }, 30000)
    }

    render() {
        return (
            <WalletBlock items = {this.props.items}/>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsFirstLoading
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url)),
        itemsFirstLoading: (bool) => dispatch(itemsFirstLoading(bool))
    }
}

export default connect(mapStateToProps, mapDispatchProps)(ItemList);

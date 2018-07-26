import React, { Component } from 'react'
import HiddenBlock from './hiddenBlock.jsx'
import {connect} from 'react-redux'
import {itemsFetchData, itemsFirstLoading, itemsHasErrored, removeWallet} from '../redux/actions/items'

class Wallet extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            class_s: 'wallet wallet_size_s',
            class_l: 'wallet wallet_size_l',
            elapsed: 0
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 1000);
    }

    tick = () => {
        let arr = this.props.item.history
        if(this.state.elapsed >= 60) {
            this.fetchRequest(this.props.item.account)
            this.setState({elapsed: 0})
        } else this.setState({elapsed: Math.round((Date.now() - arr[arr.length-1].date)/1000)});
    }

    render() {
        const {isOpen} = this.state
        const {item} = this.props

        return (

            <div className={isOpen ? this.state.class_l : this.state.class_s}>
                <div className="part_one">
                <div className="balance">
                    <span className="close" onClick = {this.removeBlock}>Close</span>
                    <span className="text">Ether balance</span>
                    <p>{this.digitNumber(item.balance)}</p>
                </div>
                <div className="account">
                    <div className="address">
                        <span>Address</span>
                        <p>{item.account}</p>
                    </div>
                    <div className="button">
                        <p onClick = {this.toggleOpen.bind(this)}>
                            {isOpen ? 'Less' : 'More'}
                        </p>
                    </div>
                </div>
                </div>
                {this.getMore()}
            </div>
        )
    }

    getMore() {
        if(!this.state.isOpen) return null
        return <HiddenBlock items = {this.props.item} />
    }

    fetchRequest = wallet => {
      this.props.fetchData(`https://api.etherscan.io/api?module=account&action=balancemulti&address=${wallet}&tag=latest`)
    }

    toggleOpen() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    removeBlock = () => {
        this.props.removeWallet(this.props.item.account)
    }

    digitNumber(balance) {
    let correctBalance = balance;
    let correctLength = 19;

    if(correctBalance == 0) {
        return 0;
    };

    if(correctBalance.length < correctLength) {
        let difference = correctLength - correctBalance.length;
        correctBalance = this.addZero(difference) + correctBalance;
    };

    correctBalance = correctBalance.split("").reverse();

    correctBalance = [].concat(correctBalance.slice(0, correctLength - 1), '.', correctBalance.slice(correctLength-1));
    correctBalance = ((correctBalance.reverse()).join('')).replace(/(\d)(?=(\d\d\d)+([^\d]))/g, '$1,');
    return correctBalance;
    }

    addZero(count) {
    let str = "";
    for(let start = 0; start < count; start++) {
        str += 0;
    }
    return str;
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url)),
        removeWallet: (wallet) => dispatch(removeWallet(wallet))
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Wallet);

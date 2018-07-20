import React, { Component } from 'react'
import GetListLi from './getListLi.jsx'

export default class Wallet extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            class_s: 'wallet wallet_size_s',
            class_l: 'wallet wallet_size_l'
        }
    }

    render() {
        const {isOpen} = this.state
        const {item} = this.props

        return (

            <div className={isOpen ? this.state.class_l : this.state.class_s}>
                <div className="part_one">
                <div className="balance">
                    <span className="close">Close</span>
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
        return <GetListLi items = {this.props.item} />
    }

    toggleOpen() {
        this.setState({
            isOpen: !this.state.isOpen
        })
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
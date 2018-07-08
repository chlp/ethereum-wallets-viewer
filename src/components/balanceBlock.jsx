import React, {Component} from 'react'

export default class balanceBlock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items
        }
    }

    render() {
        const {account, balance} = this.state.items[0]

        return (
            <div className = "wallet">
                <div className = "wallet__balance">
                    <span>Balance</span>
                    <p>{this.digitNumber(balance)}</p>
                </div>
                <div className = "wallet__account">
                    <p>{account}</p>
                </div>
            </div>
        )
    }

    digitNumber(balance) {
        let b = (balance/Math.pow(10,18)).toString().replace(/(\d)(?=(\d\d\d)+([^\d]))/g, '$1,');
        return b;
    };

}

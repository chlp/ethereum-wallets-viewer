import React, {Component} from 'react'
import BalanceBlock from './balanceBlock.jsx'
import {wallet} from '../data/wallet.js'
import '../scss/index.scss'

export default class AjaxRequest extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            status: false,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch(`https://api.etherscan.io/api?module=account&action=balancemulti&address=${wallet[0].account}&tag=latest`)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                status: result.status > 0 ? true : false,
                items: result.result
              });
            },
            (error) => {
              this.setState({
                error
              });
            }
          )
      }

    render() {

        if (this.state.isLoaded && this.state.status) {
            return (
                <div>
                    <BalanceBlock items = {this.state.items} />
                </div>
            )
        } else return null

    }
}

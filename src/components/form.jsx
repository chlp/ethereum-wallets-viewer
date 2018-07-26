import React, {Component} from 'react'
import {connect} from 'react-redux'
import {itemsFetchData, itemsFirstLoading, itemsHasErrored} from '../redux/actions/items'
import WalletBlock from './walletBlock.jsx'

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            itemsLength: false
        }
    }

    handleChange = event => {
        this.setState({value: event.target.value})
    }

  handleSubmit = event => {
    this.fetchRequest(this.container.value)
    this.container.value = ""
    this.setState({value: ""})
    event.preventDefault()
  }

  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit} className="form__group">
              <input ref = {this.setContainerRef} type="text" autoComplete="off" name="message" className="form__input" placeholder="Enter your wallet address" id="name" value={this.state.value} onChange={this.handleChange} required/>
              <label htmlFor="name" className="form__label">Enter your wallet address</label>
          </form>
          {this.walletsRender()}
      </div>
    );
  }

  fetchRequest = wallet => {
    this.props.fetchData(`https://api.etherscan.io/api?module=account&action=balancemulti&address=${wallet}&tag=latest`)
  }

  setContainerRef = ref => {
    this.container = ref
  }

  walletsRender = () => {
    //if(!this.state.itemsLength) return null;
    return (
        <WalletBlock items = {this.props.items}/>
    )
  }

  componentWillReceiveProps(nextProps) {
      if(nextProps.items.length && !this.state.itemsLength || !nextProps.items.length && this.state.itemsLength) {
        this.setState({itemsLength: !this.state.itemsLength})
      }
    //console.log(nextProps.hasErrored)
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
        itemsFirstLoading: (bool) => dispatch(itemsFirstLoading(bool))
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Form);

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {itemsFetchData, itemsHasErrored} from '../redux/actions/items'
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

    accountSearch = string => {
        string = (string.replace(/^[^\w\d]*/, '')).replace(/[^\w\d]*$/, '');
        string = (string.replace(/[^\w\d]+/g, " ")).replace(/  /g, ' ');
        string = ((string.split(/ /g))).join(',');
        return string;
    }

    render() {
        return (
            <div>
            <div className="background-circle_blue"></div>
            <div className="background-circle_green"></div>
            <div>
                <form onSubmit={this.handleSubmit} className="form__group">
                    <input ref = {this.setContainerRef} type="text" autoComplete="off" name="message" className="form__input" placeholder="Enter your wallet address" id="name" value={this.state.value} onChange={this.handleChange} required/>
                    <label htmlFor="name" className="form__label">Enter your wallet address</label>
                </form>
                {this.walletsRender()}
            </div>
            </div>
        );
    }

    fetchRequest = wallet => {
        this.props.fetchData(this.accountSearch(wallet))
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
        fetchData: (url) => dispatch(itemsFetchData(url))
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Form);

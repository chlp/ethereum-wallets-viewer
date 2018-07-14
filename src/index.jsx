import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import ItemList from './components/ItemList.jsx'
import configureStore from './store/configureStore'
import './scss/index.scss'

const store = configureStore(); // You can also pass in an initialState here

render(
    <Provider store={store}>
        <ItemList />
    </Provider>,
    document.getElementById('container')
)

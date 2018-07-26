import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import Form from './components/form.jsx'
import configureStore from './redux/store/configureStore'
import './scss/index.scss'

const store = configureStore();

render (
    <Provider store={store}>
        <Form />
    </Provider>,
    document.getElementById('container')
)

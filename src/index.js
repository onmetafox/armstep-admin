import React from 'react'
import 'react-app-polyfill/stable'
import 'core-js'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import dotenv from 'dotenv'

import App from './App'
import reportWebVitals from './reportWebVitals'
import store from './store'

dotenv.config()

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

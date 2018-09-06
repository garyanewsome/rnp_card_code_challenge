import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import Q from 'kew'

import AppStore from './stores/AppStore.js'

Q.all([
  AppStore.setup()
])
.then(function(){
  ReactDOM.render(<App />, document.getElementById('root'))
  registerServiceWorker()
})

import React, { Component } from 'react'
// import logo from './logo.svg'
import Layout from './components/layout/Layout'
import './App.css'

let ENV = 'development'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Layout env={ENV} />
      </div>
    )
  }
}


export default App

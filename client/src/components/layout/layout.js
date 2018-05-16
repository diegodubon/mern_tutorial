import React, { Component } from 'react'
import NavBar from './navbar'
import Landing from './landing'
import Footer from './footer'
class Layout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      env: props.env
    }
  }
  render () {
    return (
      <div className='App'>
        <NavBar />
        <Landing />
        <Footer env={this.state.env} />
      </div>
    )
  }
}

export default Layout

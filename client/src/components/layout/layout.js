import React, { Component } from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import NavBar from './Navbar'
import Landing from './Landing'
import Footer from './Footer'
import Rtn from '../apps/Rtn'
import Login from '../auth/Login'
import Register from '../auth/Register'
class Layout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      env: props.env
    }
  }
  render () {
    return (
      <Router>
        <div className='App'>
          <NavBar />
          <Route exact path='/' component={Landing} />
          <div className='container'>
          
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/rtn' component={Rtn} />
          </div>
          <Footer env={this.state.env} />
        </div>
      </Router>
    )
  }
}

export default Layout



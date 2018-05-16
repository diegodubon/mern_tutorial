import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Register from './register'
class Landing extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div className='landing'>
        <div className='dark-overlay landing-inner text-light'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12 text-center'>
                <h1 className='display-3 mb-4'>
                  Dev Lms
                </h1>
                <p className='lead'>
                  {' '}
                  Create a developer profile/portfolio, and admin all Lms Products
                </p>
                <hr />

                <Router>
                  <div>
                    <a href='/register' class='btn btn-lg btn-info mr-2'>
                      Sign Up
                    </a>
                    <a href='/login' class='btn btn-lg btn-light'>Login</a>
                    <Route exact path='/register' component={Register} />
                    {/* <Route path='/login' component={Login} /> */}
                  </div>
                </Router>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing

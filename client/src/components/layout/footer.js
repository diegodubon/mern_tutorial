import React, { Component } from 'react'

class Footer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      env: props.env
    }
  }
  render () {
    return (
      <footer className='bg-dark text-white mt-5 p-4 text-center absolute-bottom'>
        Copyright © {new Date().getFullYear()} Lms Dev Portal
      </footer>
    )
  }
}

export default Footer

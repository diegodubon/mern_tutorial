let chalk = require('chalk')

function debug (func, message) {
  message = message || ''

  if (typeof message === 'object') {
    message = JSON.stringify(message)
  }
  let level = 'DEBUG'
  let date = new Date().toLocaleTimeString()
  console.log(chalk.blue(`${date} | ${level} | ${func} |  ${message}`))
}

function info (func, message) {
  if (typeof message === 'object') {
    message = JSON.stringify(message)
  }
  message = message || ''
  let level = 'INFO'
  let date = new Date().toLocaleTimeString()
  console.log(chalk.white(`${date} | ${level} | ${func} |  ${message}`))
}

function error (func, message) {
  if (typeof message === 'object') {
    message = JSON.stringify(message)
  }
  message = message || ''
  let level = 'ERROR'
  let date = new Date().toLocaleTimeString()
  console.log(chalk.red(`${date} | ${level} | ${func} |  ${message}`))
}

module.exports = {
  error,
  info,
  debug
}

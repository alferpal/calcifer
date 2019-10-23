
const { name } = require('./package')
const jestBase = require('../../jest.config.js')

const config = {
  ...jestBase,
  displayName: name,
  name,
}

module.exports = config

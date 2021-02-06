const { writeFileSync } = require('fs')
const pkg = require('./package.json')

pkg.peerDependencies = pkg.devDependencies

writeFileSync('./package.json', JSON.stringify(pkg, null, 2), { encoding: 'utf-8' })

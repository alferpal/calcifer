const simpleGit = require('simple-git').default

const git = simpleGit({ baseDir: process.cwd() })

function getPackageAndVersion(line) {
  const [,pkg,, version] = line.split('"')

  return {
    pkg,
    version: version.substring(1),
  }
}

async function generateDifferences() {
  const differencesMap = {}

  const diff = await git.diff()

  const changes = diff.split('index ')

  changes.shift()

  changes.forEach((change) => {
    if (!change.includes('package.json\n+++')) {
      return
    }

    const lines = change.split('\n')

    let package = ''

    lines.forEach((line) => {
      if (line.startsWith('---')) {
        const [, type, packageFolder] = line.split('/')

        if (type === 'templates') {
          package = `calcifer-${packageFolder}-template`
        } else {
          package = packageFolder
        }

        differencesMap[package] = {}
      } else if (line.startsWith('- ')) {
        const { pkg, version } = getPackageAndVersion(line)
        const curr = differencesMap[package][pkg]

        differencesMap[package][pkg] = { ...curr, old: version }
      } else if (line.startsWith('+ ')) {
        const { pkg, version } = getPackageAndVersion(line)
        const curr = differencesMap[package][pkg]

        differencesMap[package][pkg] = { ...curr, new: version }
      }
    })
  })

  let output = '# Updated dependencies\n'

  Object.entries(differencesMap).forEach(([package, updates]) => {
    output += `## ${package}\n`

    Object.entries(updates).forEach(([pkg, version]) => {
      output += `- ${pkg}: ${version.old} -> ${version.new}\n`
    })

    output+='\n'
  })

  console.log(output)
}

generateDifferences()

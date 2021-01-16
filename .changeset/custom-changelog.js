const simpleGit = require('simple-git').default
const { resolve } = require('path')

const git = simpleGit(resolve(__dirname, '../.git'))

const BASE_URL = 'https://github.com/alferpal/calcifer/commit/'

async function findBreakings(scope) {
  const commits = await getCommitsSinceLastRelease(
    scope,
    (commit) => isBreaking(commit),
  )

  return commits
}

async function findFeatures(scope) {
  const commits = await getCommitsSinceLastRelease(
    scope,
    (commit) => isFeat(commit) && !isBreaking(commit),
  )

  return commits
}

async function findFixes(scope) {
  const commits = await getCommitsSinceLastRelease(
    scope,
    (commit) => isFix(commit) && !isBreaking(commit),
  )

  return commits
}

async function getCommitsSinceLastRelease(scope, filterFunction) {
  const tags = await git.tag(['-l', '--sort=-version:refname', `@alferpal/${scope}*`])

  const [lastTag] = tags.split('\n')

  const taggedCommit = (await git.raw(['rev-list', '-n', '1', lastTag])).replace('\n', '')

  const { all } = await git.log([`${taggedCommit}..HEAD`])

  const commits = await Promise.all(
    all
      .filter((commit) => filterFunction(commit) && commit.message.includes(scope))
      .map(async (commit) => {
        commit.short = await getShortCommitId(commit.hash)

        const index = commit.message.indexOf(':')

        commit.description = commit.message.substring(index + 1).trim()

        return commit
      }),
  )

  return commits
}

async function getShortCommitId(hash) {
  return await git.revparse(['--short', hash])
}

function isBreaking(commit) {
  return commit.body.includes('BREAKING CHANGE')
}
function isFeat(commit) {
  return commit.message.startsWith('feat')
}
function isFix(commit) {
  return commit.message.startsWith('fix')
}

const commitFinders = {
  major: findBreakings,
  minor: findFeatures,
  patch: findFixes,
}

async function getReleaseLine(changeset) {
  const [release] = changeset.releases

  const { name, type } = release

  const [, scope] = name.split('/')

  const finder = commitFinders[type]

  const commits = await finder(scope)

  const log = commits.map((commit) => `- **${scope}:** ${commit.description} ([${commit.short}](${BASE_URL}${commit.hash}))`).join('\n')

  return log
}

async function getDependencyReleaseLine() {
  return ''
}

module.exports = {
  getReleaseLine,
  getDependencyReleaseLine,
}

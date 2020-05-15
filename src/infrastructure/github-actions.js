const core = require('@actions/core')

const { DEFAULT_GITHUB_TOKEN, DEFAULT_LABEL, DEFAULT_LABEL_ACTION, DEFAULT_REPOSITORY_NAME } = require('./constants')

/**
 * Gets github token and parses it
 */
const getGithubToken = () => {
  const token = core.getInput('github-token') || DEFAULT_GITHUB_TOKEN
  if (token) return token
  throw new Error('Missing Github Token')
}

/**
 * Gets repository name
 */
const getRepositoryName = () => {
  const repositoryName = core.getInput('repository-name') || DEFAULT_REPOSITORY_NAME
  if (repositoryName) return repositoryName
  throw new Error('Missing Repository Name')
}

/**
 * Gets label action
 */
const getLabelAction = () => {
  const labelAction = core.getInput('label-action') || DEFAULT_LABEL_ACTION
  if (labelAction) {
    if (labelAction.toLowerCase() === 'add' || labelAction.toLowerCase() === 'remove') return labelAction.toLowerCase()
    throw new Error('Just add and remove are allowed as label actions')
  }
  throw new Error('Missing Label Action')
}

/**
 * Gets label name
 */
const getLabel = () => {
  const label = core.getInput('label') || DEFAULT_LABEL
  if (label) return label
  throw new Error('Missing Label')
}

/**
 * Sets the Github Action to fail
 * @param {string} message
 */
const throwGithubError = (message) => {
  core.setFailed(message)
}

module.exports = {
  throwGithubError,
  getGithubToken,
  getLabel,
  getLabelAction,
  getRepositoryName,
}

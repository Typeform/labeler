const core = require('@actions/core')

const {
  DEFAULT_GITHUB_TOKEN,
  DEFAULT_LABEL,
  DEFAULT_LABEL_ACTION,
  DEFAULT_REPOSITORY_NAME,
  DEFAULT_BASE_BRANCH,
  DEFAULT_HARD_FAILURE,
} = require('./constants')

/**
 * Gets github token and parses it
 */
const getGithubToken = () => {
  const token = core.getInput('github-token') || DEFAULT_GITHUB_TOKEN
  if (token) return token
  throw new Error('Missing Github Token')
}

/**
 * Gets repository slug. Eg. Typeform/labeler
 */
const getRepositorySlug = () => {
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
 * Gets base branch
 */
const getBaseBranch = () => {
  return (core.getInput('base-branch') || DEFAULT_BASE_BRANCH)
}

/**
 * Gets hard-failure
 */
const getHardFailure = () => {
  const shouldHardFailure = core.getInput('hard-failure') || DEFAULT_HARD_FAILURE
  if (shouldHardFailure.toLowerCase() === 'true') return true
  return false
}

/**
 * Sets the Github Action to fail
 * @param {string} message
 */
const throwGithubError = (message) => {
  core.setFailed(message)
}

/**
 * If app fails outputs a Warning or either throws an Error depending on hard-failure env variable
 * @param {Object} error
 */
const outputFailure = (error) => {
  if (getHardFailure()) {
    throwGithubError(error.message)
  } else {
    throwGithubWarning(error.message)
  }
}
/**
 * Sets a Github warning in the console
 * @param {string} message
 */
const throwGithubWarning = (message) => {
  core.warning(message)
}

/**
 * returns the owner and name of the repo
 * @param {string} repositoryNameAndOwner
 */
const getSeparatedRepositoryNameAndOwner = (repositoryNameAndOwner) => {
  const splitNameAndOwner = repositoryNameAndOwner.split('/')
  return { owner: splitNameAndOwner[0], name: splitNameAndOwner[1] }
}

module.exports = {
  throwGithubError,
  getGithubToken,
  getLabel,
  getLabelAction,
  getRepositorySlug,
  getBaseBranch,
  getHardFailure,
  getSeparatedRepositoryNameAndOwner,
  outputFailure,
  throwGithubWarning,
}

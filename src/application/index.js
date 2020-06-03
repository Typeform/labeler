require('dotenv').config()
const { getLabel, throwErrorFailOnHardFailure, getLabelAction, getBaseBranch } = require('../infrastructure/github-actions')
const GithubAPI = require('../infrastructure/githubapi')

const aGithubAPI = new GithubAPI()

/**
 * Adds a label in a PullRequest
 * @param {String} labelToAdd the label to be added
 * @param {Array} labels list of labels already in the pull request
 * @param {String} number of the pull request
*/
const addLabel = (labelToAdd, labels, number) => {
  return aGithubAPI.updatePRLabels(number, [...labels, labelToAdd])
}

/**
 * Removes a label from a PullRequest
 * @param {String} labelToDelete the label to be removed
 * @param {Array} labels list of labels already in the pull request
 * @param {String} number of the pull request
*/
const removeLabel = (labelToDelete, labels, number) => {
  return aGithubAPI.updatePRLabels(number, labels.filter(label => label !== labelToDelete))
}

/**
 * Obtains a list of Open PullRequests (excluding Drafts, Closed,...) in a Github repository
 * @param {String} baseBranch the base branch of the Pull Requests
*/
const listAllOpenPRs = (baseBranch) => {
  return aGithubAPI.listAllOpenPRsForRepo(baseBranch)
}

const main = async () => {
  try {
    const openPullRequests = await listAllOpenPRs(getBaseBranch())

    for (const pr of openPullRequests) {
      const labels = pr.labels.map(label => label.name)
      switch (getLabelAction()) {
        case 'add':
          // following conditions prevents extra github call to avoid reaching API limits
          if (!labels.includes(getLabel())) await addLabel(getLabel(), labels, pr.number)
          break
        case 'remove':
          // following conditions prevents extra github call to avoid reaching API limits
          if (labels.includes(getLabel())) await removeLabel(getLabel(), labels, pr.number)
          break
        default:
          throw new Error('Invalid Label Action, should be either ADD or REMOVE')
      }
    }
  } catch (error) {
    throwErrorFailOnHardFailure(error)
  }
}

main()


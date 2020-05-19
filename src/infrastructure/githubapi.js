const { Octokit } = require('@octokit/rest')

const { getGithubToken } = require('./github-actions')

const octokit = new Octokit({
  auth: getGithubToken(),
})

/**
 * Makes a call to get all the Open PRs for a Repo using pagination
 * @param {string} repoOwner eg: Typeform
 * @param {string} repoName eg: labeler
 * @param {string} baseBranch eg: master
 */
const listAllOpenPRsForRepo = async (repoOwner, repoName, baseBranch) => {
  const params = {
    owner: repoOwner,
    repo: repoName,
  }
  if (baseBranch) params.base = baseBranch
  return octokit.paginate('GET /repos/:owner/:repo/pulls', params)
}

const addLabel = (labelToAdd, labels, repoOwner, repoName, number) => {
  updatePRLabels(repoOwner, repoName, number, [...labels, labelToAdd])
}

const removeLabel = (labelToDelete, labels, repoOwner, repoName, number) => {
  updatePRLabels(repoOwner, repoName, number, labels.filter(label => label !== labelToDelete))
}

/**
 * Updates the label of a PR
 * @param {string} repoOwner eg: Typeform
 * @param {string} repoName eg: labeler
 * @param {string} number of the pull request
 * @param {Array} labels to be added to the pull request
 */
const updatePRLabels = async (repoOwner, repoName, number, labels) => {
  return octokit.issues.update({
    owner: repoOwner,
    repo: repoName,
    issue_number: number,
    labels,
  })
}

module.exports = {
  listAllOpenPRsForRepo,
  addLabel,
  removeLabel,
}

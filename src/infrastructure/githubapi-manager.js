const { listAllOpenPRsForRepo, updatePRLabels, deletePRLabels } = require('./githubapi')
const { asyncForEach } = require('./utils')

/**
 * Gets all the PR Numbers of a list of Github PullRequest
 * @param {Array} allPRsResponse
 */
const getPRNumbers = (allPRsResponse) => {
  const prNumbers = []
  allPRsResponse.forEach(pr => {
    prNumbers.push(pr.number)
  })
  return prNumbers
}

/**
 * Returns an array with all the open PRs of that repo
 * @param {string} repoNameWithOwner eg: Typeform/siesta
 */

const getPRNumbersForRepo = async (repoNameWithOwner) => {
  return getPRNumbers(await listAllOpenPRsForRepo(repoNameWithOwner))
}

/**
 * Updates All PRs of a Repo with the given label
 * @param {Array} allPRNumbers
 * @param {string} repoNameWithOwner eg: Typeform/siesta
 * @param {string} labelAction add or remove
 * @param {string} label to be added to the pull request
 */

const updateAllPRLabels = async (allPRNumbers, repoNameWithOwner, labelAction, label) => {
  await asyncForEach(allPRNumbers, async (prNumber) => {
    if (labelAction === 'add') return await updatePRLabels(repoNameWithOwner, `${prNumber}`, label)
    else if (labelAction === 'remove') return await deletePRLabels(repoNameWithOwner, `${prNumber}`)
    throw new Error('Error updating all PR Labels. Invalid Label Action')
  })
}

module.exports = {
  getPRNumbers,
  getPRNumbersForRepo,
  updateAllPRLabels,
}

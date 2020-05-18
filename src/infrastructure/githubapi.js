const axios = require('axios')

const { getGithubToken } = require('./github-actions')

const githubToken = getGithubToken()

/**
 * Makes a call to get all the Open PRs for a Repo
 * @param {string} repoNameWithOwner eg: Typeform/siesta
 */
const listAllOpenPRsForRepo = async (repoNameWithOwner) => {
  return axios({
    method: 'GET',
    baseURL: 'https://api.github.com/',
    headers: { Authorization: `Bearer ${githubToken}` },
    url: `repos/${repoNameWithOwner}/pulls`,
  }).then(response => response.data)
}

/**
 * Updates the label of a PR
 * @param {string} repoNameWithOwner eg: Typeform/siesta
 * @param {string} number of the pull request
 * @param {Array} labels to be added to the pull request
 */

const updatePRLabels = async (repoNameWithOwner, number, labels) => {
  return axios({
    method: 'PATCH',
    baseURL: 'https://api.github.com/',
    headers: { Authorization: `Bearer ${githubToken}` },
    url: `repos/${repoNameWithOwner}/issues/${number}`,
    data: {
      labels,
    },
  }).then(response => response.data)
}

module.exports = {
  listAllOpenPRsForRepo, updatePRLabels,
}

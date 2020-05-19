const { Octokit } = require('@octokit/rest')

const { getGithubToken, getSeparatedRepositoryNameAndOwner, getRepositorySlug } = require('./github-actions')

class GithubAPI {
  constructor () {
    this.authToken = getGithubToken()
    this.repoOwner = getSeparatedRepositoryNameAndOwner(getRepositorySlug()).owner
    this.repoName = getSeparatedRepositoryNameAndOwner(getRepositorySlug()).name
    this.octokit = new Octokit({ auth: this.authToken })
  }

  /**
   * Makes a call to get all the Open PRs for a Repo using pagination
   * @param {String} baseBranch eg: master
   */
  async listAllOpenPRsForRepo (baseBranch) {
    const params = {
      owner: this.repoOwner,
      repo: this.repoName,
    }
    if (baseBranch) params.base = baseBranch
    return this.octokit.paginate('GET /repos/:owner/:repo/pulls', params)
  }

  /**
   * Updates the label of a PR
   * @param {String} number of the pull request
   * @param {Array} labels to be added to the pull request
   */
  async updatePRLabels (number, labels) {
    return this.octokit.issues.update({
      owner: this.repoOwner,
      repo: this.repoName,
      issue_number: number,
      labels,
    })
  }
}

module.exports = GithubAPI

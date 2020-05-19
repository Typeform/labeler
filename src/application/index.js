require('dotenv').config()
const { getSeparatedRepositoryNameAndOwner } = require('../domain/repository')
const { getRepositoryName, getLabel, throwGithubError, getLabelAction, getBaseBranch } = require('../infrastructure/github-actions')
const { listAllOpenPRsForRepo, addLabel, removeLabel } = require('../infrastructure/githubapi')

const main = async () => {
  try {
    const { owner: repoOwner, name: repoName } = getSeparatedRepositoryNameAndOwner(getRepositoryName())
    const openPullRequests = await listAllOpenPRsForRepo(repoOwner, repoName, getBaseBranch())

    for (const pr of openPullRequests) {
      const labels = pr.labels.map(label => label.name)
      switch (getLabelAction()) {
        case 'add':
          if (!labels.includes(getLabel())) await addLabel(getLabel(), labels, repoOwner, repoName, pr.number)
          break
        case 'remove':
          if (labels.includes(getLabel())) await removeLabel(getLabel(), labels, repoOwner, repoName, pr.number)
          break
        default:
          throw new Error('Invalid Label Action, should be either ADD or REMOVE')
      }
    }
  } catch (error) {
    throwGithubError(error.message)
  }
}

main()

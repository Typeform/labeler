require('dotenv').config()

const { getRepositoryName, getLabel, throwGithubError, getLabelAction } = require('../infrastructure/github-actions')
const { updateAllPRLabels, getPRNumbersForRepo } = require('../infrastructure/githubapi-manager')

const main = async () => {
  try {
    const repoName = getRepositoryName()
    await updateAllPRLabels(await getPRNumbersForRepo(repoName), repoName, getLabelAction(), getLabel())
  } catch (error) {
    throwGithubError(error.message)
  }
}

main()

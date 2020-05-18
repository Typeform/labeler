require('dotenv').config()
const { getPRNumbers, getPRLabels, updateLabelsForAllPRs } = require('../domain/labels')
const { getSeparatedRepositoryNameAndOwner } = require('../domain/repository')
const { getRepositoryName, getLabel, throwGithubError, getLabelAction, getBaseBranch } = require('../infrastructure/github-actions')
const { listAllOpenPRsForRepo, updatePRLabels } = require('../infrastructure/githubapi')
const { asyncForEach } = require('../infrastructure/utils')

const main = async () => {
  try {
    const repository = getSeparatedRepositoryNameAndOwner(getRepositoryName())
    const prInfoResponse = await listAllOpenPRsForRepo(repository.owner, repository.name, getBaseBranch())
    const allPRNumbers = getPRNumbers(prInfoResponse)
    const allUpdatedPRLabels = updateLabelsForAllPRs(getLabelAction(), getLabel(), getPRLabels(prInfoResponse))
    await asyncForEach(allPRNumbers, async (prNumber) => {
      await asyncForEach(allUpdatedPRLabels, async (updatedPrLabels) => {
        await updatePRLabels(repository.owner, repository.name, `${prNumber}`, updatedPrLabels)
      })
    })
  } catch (error) {
    throwGithubError(error.message)
  }
}

main()

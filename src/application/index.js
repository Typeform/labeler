require('dotenv').config()
const { getPRNumbers, getPRLabels, updateLabelsForAllPRs } = require('../domain/labels')
const { getRepositoryName, getLabel, throwGithubError, getLabelAction } = require('../infrastructure/github-actions')
const { listAllOpenPRsForRepo, updatePRLabels } = require('../infrastructure/githubapi')
const { asyncForEach } = require('../infrastructure/utils')

const main = async () => {
  try {
    const repoNameWithOwner = getRepositoryName()
    const prInfoResponse = await listAllOpenPRsForRepo(repoNameWithOwner)
    const allPRNumbers = getPRNumbers(prInfoResponse)
    const allUpdatedPRLabels = updateLabelsForAllPRs(getLabelAction(), getLabel(), getPRLabels(prInfoResponse))
    await asyncForEach(allPRNumbers, async (prNumber) => {
      await asyncForEach(allUpdatedPRLabels, async (updatedPrLabels) => {
        await updatePRLabels(repoNameWithOwner, `${prNumber}`, updatedPrLabels)
      })
    })
  } catch (error) {
    throwGithubError(error.message)
  }
}

main()

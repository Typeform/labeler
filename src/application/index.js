require('dotenv').config()
const { getPRNumbers, getPRLabels, updateLabelsForAllPRs } = require('../domain/labels')
const { getSeparatedRepositoryNameAndOwner } = require('../domain/repository')
const { getRepositoryName, getLabel, throwGithubError, getLabelAction, getBaseBranch } = require('../infrastructure/github-actions')
const { listAllOpenPRsForRepo, updatePRLabels } = require('../infrastructure/githubapi')
const { asyncForEach } = require('../infrastructure/utils')

const main = async () => {
  try {
    const { owner: repoOwner, name: repoName } = getSeparatedRepositoryNameAndOwner(getRepositoryName())
    const prInfoResponse = await listAllOpenPRsForRepo(repoOwner, repoName, getBaseBranch())
    const allPRNumbers = getPRNumbers(prInfoResponse)
    const allCurrentPRLabels = getPRLabels(prInfoResponse)
    const allUpdatedPRLabels = updateLabelsForAllPRs(getLabelAction(), getLabel(), allCurrentPRLabels)
    await asyncForEach(allPRNumbers, async (prNumber) => {
      await asyncForEach(allUpdatedPRLabels, async (updatedPrLabels) => {
        await asyncForEach(allCurrentPRLabels, async (currentPrLabels) => {
          if (currentPrLabels !== updatedPrLabels) await updatePRLabels(repoOwner, repoName, `${prNumber}`, updatedPrLabels)
        })
      })
    })
  } catch (error) {
    throwGithubError(error.message)
  }
}

main()

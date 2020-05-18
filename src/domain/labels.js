
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
 * Gets all labels for each PR Number in the form of Array of Arrays
 * @param {Array} allPRsResponse
 */

const getPRLabels = (allPRsResponse) => {
  const labelsForPRs = []
  allPRsResponse.forEach(pr => {
    const labelsForPR = []
    pr.labels.forEach(label => {
      labelsForPR.push(label.name)
    })
    labelsForPRs.push(labelsForPR)
  })
  return labelsForPRs
}

/**
 * Adds a new label to existing Labels list
 * @param {string} labelToAdd
 * @param {Array} existingLabels
 */
const addLabelToLabelsList = (labelToAdd, existingLabels) => {
  let isLabelToAddAlreadyPresent = false
  existingLabels.forEach(existingLabel => {
    if (existingLabel === labelToAdd) isLabelToAddAlreadyPresent = true
  })
  if (isLabelToAddAlreadyPresent) return existingLabels

  existingLabels.push(labelToAdd)
  return existingLabels
}

/**
 * Removes a label from existing Labels list
 * @param {string} labelToRemove
 * @param {Array} existingLabels
 */
const removeLabelFromLabelsList = (labelToRemove, existingLabels) => {
  for (let i = existingLabels.length - 1; i >= 0; i--) {
    if (existingLabels[i] === labelToRemove) {
      existingLabels.splice(i, 1)
    }
  }
  return existingLabels
}

/**
 * Updates the array of labels with adding/removing the desired label
 * @param {string} labelAction (eg:add/remove)
 * @param {string} label
 * @param {Array} allPRLabels
 */
const updateLabelsForAllPRs = (labelAction, label, allPRLabels) => {
  labelAction = labelAction.toLowerCase()
  if (labelAction !== 'add' && labelAction !== 'remove') throw new Error('Error updating all PR Labels. Invalid Label Action')
  const updatedAllPRLabels = []
  allPRLabels.forEach(prLabels => {
    if (labelAction === 'add') updatedAllPRLabels.push(addLabelToLabelsList(label, prLabels))
    else if (labelAction === 'remove') updatedAllPRLabels.push(removeLabelFromLabelsList(label, prLabels))
  })
  return updatedAllPRLabels
}

module.exports = {
  getPRNumbers,
  getPRLabels,
  addLabelToLabelsList,
  removeLabelFromLabelsList,
  updateLabelsForAllPRs,
}

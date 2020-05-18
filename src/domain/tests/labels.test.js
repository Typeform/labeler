const { getPRNumbers, getPRLabels, addLabelToLabelsList, removeLabelFromLabelsList, updateLabelsForAllPRs } = require('../labels')

describe('getPRNumbers', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should return array of all PRs', () => {
    const request = [{ number: 223 }, { number: 224 }]
    expect(getPRNumbers(request)).toEqual([223, 224])
  })
})

describe('getPRLabels', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should return array of all PRs', () => {
    const request = [{ labels: [{ name: 'Label 1' }, { name: 'Label 2' }] }, { labels: [] }]
    expect(getPRLabels(request)).toEqual([['Label 1', 'Label 2'], []])
  })
})

describe('addLabelToLabelsList', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should return existing labels plus labelToAdd', () => {
    const labels = ['Label 1', 'Label 2']
    expect(addLabelToLabelsList('Label 3', labels)).toEqual(['Label 1', 'Label 2', 'Label 3'])
  })
  it('should not return duplicated label if labelToAdd already in the list', () => {
    const labels = ['Label 1', 'Label 2']
    expect(addLabelToLabelsList('Label 2', labels)).toEqual(['Label 1', 'Label 2'])
  })
  it('should return labelToAdd if existing labels are empty', () => {
    const labels = []
    expect(addLabelToLabelsList('Label 2', labels)).toEqual(['Label 2'])
  })
})

describe('removeLabelFromLabelsList', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should return array without the labelToRemove', () => {
    const labels = ['Label 1', 'Label 2']
    expect(removeLabelFromLabelsList('Label 2', labels)).toEqual(['Label 1'])
  })
  it('should return existing labels if labelToRemove is not in that list', () => {
    const labels = ['Label 1', 'Label 2']
    expect(removeLabelFromLabelsList('Label 3', labels)).toEqual(['Label 1', 'Label 2'])
  })
  it('should remove multiple labels if matching labelToRemove', () => {
    const labels = ['Label 1', 'Label 2', 'Label 2']
    expect(removeLabelFromLabelsList('Label 2', labels)).toEqual(['Label 1'])
  })
  it('should not remove labelToRemove if existing labels is empty', () => {
    const labels = []
    expect(removeLabelFromLabelsList('Label 2', labels)).toEqual([])
  })
})

describe('updateLabelsForAllPRs', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should return list with added label', () => {
    const existingLabelsList = [['Label 1', 'Label 2'], []]
    expect(updateLabelsForAllPRs('add', 'Label 3', existingLabelsList)).toEqual([['Label 1', 'Label 2', 'Label 3'], ['Label 3']])
  })
  it('should return list with removed label', () => {
    const existingLabelsList = [['Label 1', 'Label 2'], []]
    expect(updateLabelsForAllPRs('REMOVE', 'Label 2', existingLabelsList)).toEqual([['Label 1'], []])
  })
  it('should throw error if labelAction is not remove/add', () => {
    const existingLabelsList = [['Label 1', 'Label 2'], []]
    try {
      updateLabelsForAllPRs('UPDATE', 'Label 2', existingLabelsList)
    } catch (e) {
      expect(e.message).toEqual('Error updating all PR Labels. Invalid Label Action')
    }
  })
})

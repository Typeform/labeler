const { getSeparatedRepositoryNameAndOwner } = require('../repository')
describe('getSeparatedRepositoryNameAndOwner', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should return an object of all PRs', () => {
    expect(getSeparatedRepositoryNameAndOwner('Typeform/labeler')).toEqual({ owner: 'Typeform', name: 'labeler' })
  })
})

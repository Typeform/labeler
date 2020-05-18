const { getSeparatedRepositoryNameAndOwner } = require('../repository')
describe('getSeparatedRepositoryNameAndOwner', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should return separated name and owner', () => {
    expect(getSeparatedRepositoryNameAndOwner('Typeform/labeler')).toEqual({ owner: 'Typeform', name: 'labeler' })
  })
})

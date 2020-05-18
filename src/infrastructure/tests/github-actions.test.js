jest.mock('@actions/core')

describe('getGithubToken', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should return github token if exists', () => {
    jest.mock('../constants', () => ({ DEFAULT_GITHUB_TOKEN: 'TOKEN' }))
    // eslint-disable-next-line global-require
    const { getGithubToken } = require('../github-actions')
    expect(getGithubToken()).toEqual('TOKEN')
  })
  it('should throw error if no github token is specified', () => {
    jest.mock('../constants', () => ({ DEFAULT_GITHUB_TOKEN: '' }))
    // eslint-disable-next-line global-require
    const { getGithubToken } = require('../github-actions')
    try {
      getGithubToken()
    } catch (e) {
      expect(e.message).toEqual('Missing Github Token')
    }
  })
})

describe('getRepositoryName', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should return RepositoryName if exists', () => {
    jest.mock('../constants', () => ({ DEFAULT_REPOSITORY_NAME: 'Typeform/siesta' }))
    // eslint-disable-next-line global-require
    const { getRepositoryName } = require('../github-actions')
    expect(getRepositoryName()).toEqual('Typeform/siesta')
  })
  it('should throw error if no RepositoryName is specified', () => {
    jest.mock('../constants', () => ({ DEFAULT_REPOSITORY_NAME: '' }))
    // eslint-disable-next-line global-require
    const { getRepositoryName } = require('../github-actions')
    try {
      getRepositoryName()
    } catch (e) {
      expect(e.message).toEqual('Missing Repository Name')
    }
  })
})

describe('getLabelAction', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should return Label Action if exists and is ADD ', () => {
    jest.mock('../constants', () => ({ DEFAULT_LABEL_ACTION: 'ADD' }))
    // eslint-disable-next-line global-require
    const { getLabelAction } = require('../github-actions')
    expect(getLabelAction()).toEqual('add')
  })
  it('should return Label Action if exists and is remove ', () => {
    jest.mock('../constants', () => ({ DEFAULT_LABEL_ACTION: 'remove' }))
    // eslint-disable-next-line global-require
    const { getLabelAction } = require('../github-actions')
    expect(getLabelAction()).toEqual('remove')
  })
  it('should throw error if Label Action is specified, but not add/remove', () => {
    jest.mock('../constants', () => ({ DEFAULT_LABEL_ACTION: 'update' }))
    // eslint-disable-next-line global-require
    const { getLabelAction } = require('../github-actions')
    try {
      getLabelAction()
    } catch (e) {
      expect(e.message).toEqual('Just add and remove are allowed as label actions')
    }
  })
  it('should throw error if no Label Action is specified', () => {
    jest.mock('../constants', () => ({ DEFAULT_LABEL_ACTION: '' }))
    // eslint-disable-next-line global-require
    const { getLabelAction } = require('../github-actions')
    try {
      getLabelAction()
    } catch (e) {
      expect(e.message).toEqual('Missing Label Action')
    }
  })
})

describe('getLabel', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should return Label if exists', () => {
    jest.mock('../constants', () => ({ DEFAULT_LABEL: 'Label' }))
    // eslint-disable-next-line global-require
    const { getLabel } = require('../github-actions')
    expect(getLabel()).toEqual('Label')
  })
  it('should throw error if no Label is specified', () => {
    jest.mock('../constants', () => ({ DEFAULT_GOOGLE_TOKEN: '' }))
    // eslint-disable-next-line global-require
    const { getLabel } = require('../github-actions')
    try {
      getLabel()
    } catch (e) {
      expect(e.message).toEqual('Missing Label')
    }
  })
})

describe('getBaseBranch', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should return a base branch', () => {
    jest.mock('../constants', () => ({ DEFAULT_BASE_BRANCH: 'master' }))
    // eslint-disable-next-line global-require
    const { getBaseBranch } = require('../github-actions')
    expect(getBaseBranch()).toEqual('master')
  })
})

describe('throwGithubError', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should throw github error', () => {
    // eslint-disable-next-line global-require
    const { throwGithubError } = require('../github-actions')
    // eslint-disable-next-line global-require
    const core = require('@actions/core')
    throwGithubError('message')
    expect(core.setFailed).toHaveBeenCalledWith('message')
  })
})

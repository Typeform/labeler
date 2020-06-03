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

describe('getRepositorySlug', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should return RepositorySlug if exists', () => {
    jest.mock('../constants', () => ({ DEFAULT_REPOSITORY_NAME: 'Typeform/siesta' }))
    // eslint-disable-next-line global-require
    const { getRepositorySlug } = require('../github-actions')
    expect(getRepositorySlug()).toEqual('Typeform/siesta')
  })
  it('should throw error if no RepositorySlug is specified', () => {
    jest.mock('../constants', () => ({ DEFAULT_REPOSITORY_NAME: '' }))
    // eslint-disable-next-line global-require
    const { getRepositorySlug } = require('../github-actions')
    try {
      getRepositorySlug()
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

describe('getHardFailure', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should return a the value of HARD_FAILURE env', () => {
    jest.mock('../constants', () => ({ DEFAULT_HARD_FAILURE: 'TRUE' }))

    // eslint-disable-next-line global-require
    const { getHardFailure } = require('../github-actions')
    expect(getHardFailure()).toEqual(true)
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

describe('outputFailure', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should throw github error if HARD_FAILURE true', () => {
    jest.mock('../constants', () => ({ DEFAULT_HARD_FAILURE: 'true' }))

    // eslint-disable-next-line global-require
    const { outputFailure } = require('../github-actions')
    // eslint-disable-next-line global-require
    const core = require('@actions/core')
    outputFailure({ message: 'message' })
    expect(core.setFailed).toHaveBeenCalledWith('message')
  })
  it('should throw github warning if HARD_FAILURE false', () => {
    jest.mock('../constants', () => ({ DEFAULT_HARD_FAILURE: 'false' }))
    // eslint-disable-next-line global-require
    const { outputFailure } = require('../github-actions')
    // eslint-disable-next-line global-require
    const core = require('@actions/core')
    outputFailure({ message: 'message' })
    expect(core.warning).toBeCalledWith('message')
  })
})

describe('throwGithubWarning', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should throw github warning', () => {
    // eslint-disable-next-line global-require
    const { throwGithubWarning } = require('../github-actions')
    // eslint-disable-next-line global-require
    const core = require('@actions/core')
    throwGithubWarning('message')
    expect(core.warning).toHaveBeenCalledWith('message')
  })
})

describe('getSeparatedRepositoryNameAndOwner', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should return separated name and owner', () => {
    // eslint-disable-next-line global-require
    const { getSeparatedRepositoryNameAndOwner } = require('../github-actions')
    expect(getSeparatedRepositoryNameAndOwner('Typeform/labeler')).toEqual({ owner: 'Typeform', name: 'labeler' })
  })
})

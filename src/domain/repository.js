/**
 * returns the owner and name of the repo
 * @param {string} repositoryNameAndOwner
 */
const getSeparatedRepositoryNameAndOwner = (repositoryNameAndOwner) => {
  const splitNameAndOwner = repositoryNameAndOwner.split('/')
  return { owner: splitNameAndOwner[0], name: splitNameAndOwner[1] }
}

module.exports = {
  getSeparatedRepositoryNameAndOwner,
}

/**
 * Executes an forEach in an async fashion
 * @param {Array} array
 * @param {function} callback
 */

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

module.exports = {
  asyncForEach,
}

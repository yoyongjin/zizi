const path = require('path');
const isDev = require('electron-is-dev');
const Store = require('electron-store');

const store = new Store();

let dbFileName;

if (store.has('dbFileName')) {
  // console.log(store.get('dbFileName'));
  // store.get returns array, so (xxx)[]0
  const getDbFileName = store.get('dbFileName')[0];
  dbFileName = getDbFileName;
  module.exports = dbFileName;
} else {
  if (isDev && process.argv.indexOf('--noDevServer') === -1) {
    dbFileName = path.join(
      path.dirname(__dirname),
      'extraResources',
      'standard_database.db'
    );
  } else {
    dbFileName = path.join(
      process.resourcesPath,
      'extraResources',
      'standard_database.db'
    );
  }
  module.exports = dbFileName;
}

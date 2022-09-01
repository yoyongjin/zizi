/* eslint-disable no-console */
import path from 'path';
import isDev from 'electron-is-dev';
import sqlite from 'sqlite3';

const sqlite3 = sqlite.verbose();

const db = new sqlite3.Database(
  isDev
    ? path.join(__dirname, './extraResources/standard_database.db') // my root folder if in dev mode
    : path.join(process.resourcesPath, 'extraResources/standard_database.db'), // the resources path if in production build
  (err) => {
    if (err) {
      console.log(`Database Error: ${err}`);
    } else {
      console.log('Database Loaded');
    }
  }
);

module.exports = db;

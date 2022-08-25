/* eslint-disable consistent-return */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable global-require */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
const fs = require('fs');
const initSqlJs = require('sql.js');

const dbFileName = require('./dbconfig');

let _rowsFromSqlDataArray = function (object) {
  let data = [];
  let i = 0;
  let j = 0;
  for (let valueArray of object.values) {
    data[i] = {};
    j = 0;
    for (let column of object.columns) {
      Object.assign(data[i], { [column]: valueArray[j] });
      j++;
    }
    i++;
  }
  return data;
};

const sqlFilterXml2Json = (movies) => {
  // movies.c08, c20 is the type of xml
  // movies is array
  // if movies is object, below is error
  const parser = require('xml2json-light');

  movies.forEach((row) => {
    if (row.c08 !== '') {
      var poster = parser.xml2json(row.c08);
      // console.log(poster);
      var poster_temp = [];

      if (Array.isArray(poster.thumb)) {
        poster.thumb.map((i) => {
          if (i.aspect === 'poster') {
            poster_temp.push(i);
          } else if (i.aspect === undefined) {
            poster_temp.push(i);
          }
          // console.log(poster_temp);
        });
      } else {
        poster_temp.push(poster.thumb);
      }

      row.c08 = poster_temp[0].preview;
    }

    if (row.c20 !== '') {
      var fanart = parser.xml2json(row.c20);
      // console.log(fanart);
      var fanart_temp = [];

      if (Array.isArray(fanart.fanart.thumb)) {
        fanart.fanart.thumb.map((i) => {
          if (i.aspect === 'fanart') {
            fanart_temp.push(i);
          } else if (i.aspect === undefined) {
            fanart_temp.push(i);
          }
        });
      } else {
        fanart_temp.push(fanart.fanart.thumb);
      }

      // console.log(fanart_temp);
      row.c20 = fanart_temp[0].preview;
    }
  });

  if (Object.keys(movies).length === 0) {
    console.log('No data found');
  } else {
    // console.log('return movies');
    return movies;
  }
};

const findAll = (stmt, callback) => {
  initSqlJs().then((SQL) => {
    SQL.dbOpen = function (databaseFileName) {
      try {
        return new SQL.Database(fs.readFileSync(databaseFileName));
      } catch (error) {
        console.log("Can't open database file.", error.message);
        return null;
      }
    };

    let db = SQL.dbOpen(dbFileName);
    var res = db.exec(stmt);
    // console.log(res.legth);
    if (res.length === 0) callback([{ error: 'No Data found!' }]);
    else {
      res = _rowsFromSqlDataArray(res[0]);
      res = sqlFilterXml2Json(res);
      callback(res);
      db.close();
    }
  });
};

const findAll2 = (stmt, callback) => {
  initSqlJs().then((SQL) => {
    SQL.dbOpen = function (databaseFileName) {
      try {
        return new SQL.Database(fs.readFileSync(databaseFileName));
      } catch (error) {
        console.log("Can't open database file.", error.message);
        return null;
      }
    };

    let db = SQL.dbOpen(dbFileName);
    var res = db.exec(stmt);
    // console.log(res.legth);
    if (res.length === 0) callback([{ error: 'No Data found!' }]);
    else {
      res = _rowsFromSqlDataArray(res[0]);
      callback(res);
      db.close();
    }
  });
};

const getData = (query) => {
  // var stmt = `select idMovie, c00, c01, c03, c08, c19, c20, premiered, strPath,rating, uniqueid_value from movie_view where c00 like '%${query}%' order by idMovie desc`;
  // console.log(query);
  return new Promise((resolve, reject) => {
    findAll(query, (res, err) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
};

/*
 * getData2 : query without poster, thumbnail (no sqlFilterXml2Json function)
 */
const getData2 = (query) => {
  return new Promise((resolve, reject) => {
    findAll2(query, (res, err) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
};

module.exports = { getData, getData2 };

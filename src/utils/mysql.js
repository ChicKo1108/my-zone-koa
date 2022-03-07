const mysql = require('mysql')
const { config } = require('../../configs/mysql.config')
// const pool = mysql.createPool(config)
const db = mysql.createConnection(config);
db.connect(err => {
  if (err) {
    console.log('[database] 数据库连接失败！');
    throw err;
  }
  console.log(`[database] connection success!`);
})

function filterEntity(entity) {
  const filterEntity = {}
  for (const key in entity) {
    if (Object.hasOwnProperty.call(entity, key)) {
      const value = entity[key];
      if (value) filterEntity[key] = value;
    }
  }
  return filterEntity;
}

let query = function (sql) {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result);
      }
    });
  });
}

let update = function (table, entity, conditions) {
  const e = filterEntity(entity);
  const sql = `
    UPDATE ${table}
    SET ${Object.keys(e).map(key => `${key}='${e[key]}'`).join(', ')}
    WHERE ${Object.keys(conditions).map(key => `${key}='${conditions[key]}'`).join(' AND ')}
  `;
  return query(sql);
}

let create = function(table, entity) {
  const e = filterEntity(entity);
  const sql = `
    INSERT INTO ${table}
    (${Object.keys(e).join(', ')})
    VALUES (${Object.keys(e).map(key => `'${e[key]}'`).join(', ')})
  `;
  return query(sql);
}

module.exports = { query, update, create }
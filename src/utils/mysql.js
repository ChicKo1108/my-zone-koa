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

let query = function (sql, values) {
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

module.exports = { query }
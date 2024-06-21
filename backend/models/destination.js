const db = require('../database');

class Destination {
  static create(data, callback) {
    const { accountId, url, httpMethod, headers } = data;
    db.run(
      `INSERT INTO destinations (accountId, url, httpMethod, headers) VALUES (?, ?, ?, ?)`,
      [accountId, url, httpMethod, headers],
      function(err) {
        callback(err, this.lastID);
      }
    );
  }

  static findByAccountId(accountId, callback) {
    db.all(`SELECT * FROM destinations WHERE accountId = ?`, [accountId], callback);
  }

  static delete(id, callback) {
    db.run(`DELETE FROM destinations WHERE id = ?`, [id], callback);
  }

  static deleteByAccountId(accountId, callback) {
    db.run(`DELETE FROM destinations WHERE accountId = ?`, [accountId], callback);
  }
}

module.exports = Destination;

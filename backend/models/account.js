const db = require('../database');

class Account {
  static create(data, callback) {
    const { email, accountId, accountName, appSecretToken, website } = data;
    db.run(
      `INSERT INTO accounts (email, accountId, accountName, appSecretToken, website) VALUES (?, ?, ?, ?, ?)`,
      [email, accountId, accountName, appSecretToken, website],
      function(err) {
        callback(err, this.lastID);
      }
    );
  }

  static findByAccountId(accountId, callback) {
    db.get(`SELECT * FROM accounts WHERE accountId = ?`, [accountId], callback);
  }

  static delete(accountId, callback) {
    db.run(`DELETE FROM accounts WHERE accountId = ?`, [accountId], callback);
  }

  static findAll(callback) {
    db.all(`SELECT * FROM accounts`, [], callback);
  }
}

module.exports = Account;

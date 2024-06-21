const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./dataPusher.db');

db.serialize(() => {
  // Create Account Table
  db.run(`
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      accountId TEXT UNIQUE NOT NULL,
      accountName TEXT NOT NULL,
      appSecretToken TEXT NOT NULL,
      website TEXT
    )
  `);

  // Create Destination Table
  db.run(`
    CREATE TABLE IF NOT EXISTS destinations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      accountId TEXT NOT NULL,
      url TEXT NOT NULL,
      httpMethod TEXT NOT NULL,
      headers TEXT NOT NULL,
      FOREIGN KEY (accountId) REFERENCES accounts (accountId)
    )
  `);
});

module.exports = db;

const db = require("../db");

// Create a new user
function createUser(email, passwordHash) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO users (email, password_hash) VALUES (?, ?)`;
    db.run(query, [email, passwordHash], function (err) {
      if (err) {
        return reject(err);
      }
      resolve({ id: this.lastID, email });
    });
  });
}

// Find user by email
function findUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    db.get(query, [email], (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row || null);
    });
  });
}

module.exports = {
  createUser,
  findUserByEmail,
};


const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize SQLite database
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE users (email TEXT, password TEXT)");

  // Insert a demo user (email: test@example.com, password: 12345)
  db.run("INSERT INTO users (email, password) VALUES ('test@example.com', '12345')");
});

// Vulnerable login route (SQL Injection)
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sqlQuery = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;

  db.get(sqlQuery, (err, row) => {
    if (err) {
      return res.status(500).send('Server error');
    }
    if (row) {
      return res.status(200).send(`Login successful! Welcome ${email}`);
    }
    return res.status(401).send('Failed to log in. Please check your email and password.');
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

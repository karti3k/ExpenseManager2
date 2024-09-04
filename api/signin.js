const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Example in-memory user database (replace with your real database connection)
const users = [
  { username: 'exampleUser', password: '$2b$10$KIX/QHxM5rFbwN9pSbfVnuOPEI6MRKo9I6oht9ZL0bJQJgO.YpPbC' } // hashed password
];

// Route to handle sign-in
app.post('/api/signin', async (req, res) => {
  const { username, password } = req.body;

  // Find user in the database
  const user = users.find(u => u.username === username);

  if (user) {
    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.json({ success: true, username });
    } else {
      res.json({ success: false, message: 'Incorrect password' });
    }
  } else {
    res.json({ success: false, message: 'Username does not exist' });
  }
});

module.exports = app;

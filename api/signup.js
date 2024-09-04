const express = require('express');
const bcrypt = require('bcrypt'); // For password hashing
const cors = require('cors'); // To handle CORS
const app = express();

app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Mock database (replace with your actual database logic)
const users = [];

// Route to handle signup
app.post('/api/signup', async (req, res) => {
  const { email, username, password } = req.body;

  // Check if username or email already exists
  const usernameExists = users.some(user => user.username === username);
  const emailExists = users.some(user => user.email === email);

  if (usernameExists) {
    return res.json({ success: false, message: 'Username already exists' });
  } else if (emailExists) {
    return res.json({ success: false, message: 'Email already exists' });
  } else {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add the new user to the 'users' array (replace with your database logic)
    const newUser = { email, username, password: hashedPassword };
    users.push(newUser);

    // Assuming writeData() is your function to write to the database
    const result = true; // Simulate a successful database write operation

    if (result) {
      res.json({ success: true, email });
    } else {
      res.json({ success: false, message: 'Database is facing some issues' });
    }
  }
});

module.exports = app;

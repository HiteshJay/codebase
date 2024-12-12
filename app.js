const express = require('express');
const db = require('./db');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// --- CRUD Routes ---

// Create a new user
app.post('/users', (req, res) => {
  const { username, email, password_hash } = req.body;
  const query = 'INSERT INTO User (username, email, password_hash) VALUES (?, ?, ?)';
  db.query(query, [username, email, password_hash], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'User created successfully', userId: results.insertId });
  });
});

// Read all users
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM User';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// Update a user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  const query = 'UPDATE User SET username = ?, email = ? WHERE user_id = ?';
  db.query(query, [username, email, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'User updated successfully' });
  });
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM User WHERE user_id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'User deleted successfully' });
  });
});

// --- Start the Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

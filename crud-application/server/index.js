const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Set your MySQL root password
  database: 'crud_app'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected');
});

// Create employee table if not exists
const createTable = `CREATE TABLE IF NOT EXISTS employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  job_role VARCHAR(255) NOT NULL,
  native VARCHAR(255) NOT NULL,
  salary DECIMAL(12,2) NOT NULL
)`;
db.query(createTable, (err) => {
  if (err) throw err;
});

// Get all employees
app.get('/api/employees', (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Add employee
app.post('/api/employees', (req, res) => {
  const { name, job_role, native, salary } = req.body;
  if (!name || !job_role || !native || !salary) return res.status(400).json({ error: 'All fields are required' });
  db.query('INSERT INTO employees (name, job_role, native, salary) VALUES (?, ?, ?, ?)', [name, job_role, native, salary], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, name, job_role, native, salary });
  });
});

// Update employee
app.put('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  const { name, job_role, native, salary } = req.body;
  db.query('UPDATE employees SET name = ?, job_role = ?, native = ?, salary = ? WHERE id = ?', [name, job_role, native, salary, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id, name, job_role, native, salary });
  });
});

// Delete employee
app.delete('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM employees WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

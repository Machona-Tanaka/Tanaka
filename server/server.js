const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// MySQL connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'school'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL database');
});

// Example route
app.get('/api', (req, res) => {
    db.query('SELECT NOW() AS now', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json({ serverTime: results[0].now });
    });
});

app.get('/api/students', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
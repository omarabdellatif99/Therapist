const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Absolute path to the database file on the Desktop
const dbPath = 'C:/Users/ImmersiveRealityLab/Desktop/dbtherapy.db';

// Connect to the database
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
  }
});

// Create tables if they do not exist
db.serialize(() => {
  // Create sessions table
  db.run(`CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    headset TEXT,
    activity TEXT,
    patient TEXT
  )`, (err) => {
    if (err) {
      console.error('Error creating sessions table:', err);
    }
  });

  // Create patients table
  db.run(`CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )`, (err) => {
    if (err) {
      console.error('Error creating patients table:', err);
    }
  });
});

const insertSession = (headset, activity, patient, callback) => {
  db.run(
    'INSERT INTO sessions (headset, activity, patient) VALUES (?, ?, ?)',
    [headset, activity, patient],
    function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id: this.lastID });
    }
  );
};

const updateSession = (id, column, value, callback) => {
  const query = `UPDATE sessions SET ${column} = ? WHERE id = ?`;
  db.run(query, [value, id], function (err) {
    if (err) {
      return callback(err);
    }
    callback(null, { changes: this.changes });
  });
};

// Fetch patients from the database
const fetchPatients = (callback) => {
  db.all('SELECT * FROM patients', [], (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      return callback(err);
    }
    console.log('Rows fetched:', rows); // Add debug statement
    callback(null, rows);
  });
};

module.exports = {
  insertSession,
  updateSession,
  fetchPatients,
};

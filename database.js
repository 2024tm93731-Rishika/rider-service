 
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database setup
const DB_PATH = path.join(__dirname, 'ridersData.db');

class Database {
  constructor() {
    // Create/connect to database file
    this.db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('Error opening database:', err.message);
      } else {
        console.log('Connected to SQLite database');
        this.initializeDatabase();
      }
    });
  }

  initializeDatabase() {
    // Create the riders table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS riders (
        rider_id TEXT PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `;

    this.db.run(createTableQuery, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Riders table ready');
      }
    });
  }

  // Get all riders
  getAllRiders(callback) {
    const query = 'SELECT * FROM riders ORDER BY rider_id ASC';
    this.db.all(query, [], callback);
  }

  // Get rider by ID
  getRiderById(rider_id, callback) {
    const query = 'SELECT * FROM riders WHERE rider_id = ?';
    this.db.get(query, [rider_id], callback);
  }

  // Create new rider
  createRider(rider, callback) {
    const query = `
      INSERT INTO riders (name, email, phone)
      VALUES (?, ?, ?)
    `;
    const params = [
      rider.name,
      rider.email,
      rider.phone
    ];
    
    this.db.run(query, params, callback);
  }

  // Update rider
  updateRider(rider_id, rider, callback) {
    const query = `
      UPDATE riders 
      SET name = ?, email = ?, phone = ?, updated_at = CURRENT_TIMESTAMP
      WHERE rider_id = ?
    `;
    const params = [rider.name, rider.email, rider.phone, rider_id];
    this.db.run(query, params, callback);
  }

  // Delete rider
  deleteRider(id, callback) {
    const query = 'DELETE FROM riders WHERE rider_id = ?';
    this.db.run(query, [id], callback);
  }

  // Update rider stats (for external services)
  updateRiderStats(rider_id, rating, totalTrips, callback) {
    const query = `
      UPDATE riders 
      SET rating = ?, total_trips = ?, updated_at = CURRENT_TIMESTAMP
      WHERE rider_id = ?
    `;
    this.db.run(query, [rating, totalTrips, rider_id], callback);
  }

  close() {
    this.db.close();
  }
}

module.exports = new Database();
const XLSX = require('xlsx');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Database path
const DB_PATH = path.join(__dirname, 'ridersData.db');

// CSV file path
const CSV_FILE_PATH = path.join(__dirname, 'rhfd_riders.csv');

console.log('Starting data import...');

// Connect to database
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    process.exit(1);
  }
  console.log('Connected to database');
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS riders (
    rider_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`;

db.run(createTableQuery, (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
    process.exit(1);
  }
  console.log('Table ready..\n');
  importData();
});

function runQuery(query, params) {
  return new Promise((resolve, reject) => {
    db.run(query, params, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

async function importData() {
  try {
    console.log('Reading CSV file:', CSV_FILE_PATH);
    const workbook = XLSX.readFile(CSV_FILE_PATH, { type: 'file', raw: true });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    console.log('Found ${data.length} rows in CSV..');
    if (data.length === 0) {
      console.log('No data found in file');
      db.close();
      return;
    }

    console.log(data[0]);
    console.log('---');

    const insertQuery = `
      INSERT INTO riders (name, email, phone, created_at)
      VALUES (?, ?, ?, ?)
    `;

    let successCount = 0;
    let errorCount = 0;

    for (const [index, row] of data.entries()) {
      const id = uuidv4();
      const rider = {
        name: row.name || row.Name || row.rider_name || '',
        email: row.email || '',
        phone: row.phone || row.Phone || row.mobile || '',
		created_at: row.created_at || ''
      };

      if (!rider.name || !rider.email || !rider.phone) {
        console.log('Row ${index + 1}: Missing required fields, skipping...');
        errorCount++;
        continue;
      }

      try {
        await runQuery(insertQuery, [
          rider.name,
          rider.email,
          rider.phone,
		  rider.created_at
        ]);
        console.log('Row ${index + 1}: Imported ${rider.name} (${rider.email})');
        successCount++;
      } catch (err) {
        if (err.message.includes('UNIQUE constraint')) {
          console.log('Row ${index + 1}: Email ${rider.email} already exists, skipping...');
        } else {
          console.log('Row ${index + 1}: Error - ${err.message}');
        }
        errorCount++;
      }
    }

    console.log('Import Summary:');
    console.log('Total rows: ${data.length}');
    console.log('Successful: ${successCount}');
    console.log('Failed: ${errorCount}');
    console.log('--Import completed!--');

    db.close();
  } catch (error) {
    console.error('Error reading file:', error.message);
    db.close();
  }
}

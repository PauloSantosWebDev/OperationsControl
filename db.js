const sqlite3 = require('sqlite3').verbose();

//open the database connection
let db = new sqlite3.Database("control.sqlite", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database.");
})

//Tables creation area
//Assets types table
db.run('CREATE TABLE IF NOT EXISTS assets_types (type_id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT NOT NULL)');

//Assets main table
db.run('CREATE TABLE IF NOT EXISTS assets (asset_id INTEGER PRIMARY KEY AUTOINCREMENT, cs_asset_id TEXT NOT NULL, type TEXT, model TEXT, description TEXT, FOREIGN KEY (type) REFERENCES assets_types(type))');

//Employee table - the status is used to show current and obsolete employees
db.run('CREATE TABLE IF NOT EXISTS employees (employee_id INTEGER PRIMARY KEY AUTOINCREMENT, fname TEXT NOT NULL, lname TEXT NOT NULL, status TEXT NOT NULL)');

//Employee's personal details table
db.run('CREATE TABLE IF NOT EXISTS personal_details (employee_id INTEGER, phone TEXT, address TEXT, FOREIGN KEY (employee_id) REFERENCES employees (employee_id))');

//Qualifications table
db.run('CREATE TABLE IF NOT EXISTS qualifications (qualification_id INTEGER PRIMARY KEY AUTOINCREMENT, qualification TEXT NOT NULL, description TEXT)');

//Employee's qualifications table
db.run('CREATE TABLE IF NOT EXISTS employee_qualifications (employee_id INTEGER, qualification_id TEXT, FOREIGN KEY (employee_id) REFERENCES employees (employee_id), FOREIGN KEY (qualification_id) REFERENCES qualifications (qualification_id))');

//Job's main table
db.run('CREATE TABLE IF NOT EXISTS jobs (job_id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL)');
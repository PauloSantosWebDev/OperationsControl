const sqlite3 = require('sqlite3').verbose();

//open the database connection
let db = new sqlite3.Database("control.sqlite", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database.");
})

//Tables creation area

//Clients table
db.run('CREATE TABLE IF NOT EXISTS clients (client_id INTEGER PRIMARY KEY AUTOINCREMENT, client_name TEXT NOT NULL, email TEXT, address TEXT NOT NULL, city TEXT NOT NULL, state TEXT, postcode TEXT NOT NULL)');

//Assets table
db.run('CREATE TABLE IF NOT EXISTS assets (asset_id INTEGER PRIMARY KEY AUTOINCREMENT, cs_asset_id TEXT NOT NULL, asset_name TEXT NOT NULL, asset_type TEXT NOT NULL, description TEXT, FOREIGN KEY (asset_type) REFERENCES assets_types(asset_type_id))');

//Assets type table
db.run('CREATE TABLE IF NOT EXISTS assets_types (asset_type_id INTEGER PRIMARY KEY AUTOINCREMENT, asset_type TEXT NOT NULL, description TEXT NOT NULL)');

//Asset not available table
db.run('CREATE TABLE IF NOT EXISTS asset_not_available (asset_not_available_id INTEGER PRIMARY KEY AUTOINCREMENT, asset_id INTEGER NOT NULL, start_date TEXT NOT NULL, end_date TEXT NOT NULL, description TEXT, FOREIGN KEY (asset_id) REFERENCES assets(asset_id))');

//Employees table
db.run('CREATE TABLE IF NOT EXISTS employees (employee_id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT NOT NULL, address TEXT NOT NULL, suburb TEXT NOT NULL, postcode INTEGER NOT NULL, phone TEXT NOT NULL, email TEXT NOT NULL)');

//Employees not available table
db.run('CREATE TABLE IF NOT EXISTS employee_not_available (employee_not_available_id INTEGER PRIMARY KEY AUTOINCREMENT, employee_id INTEGER NOT NULL, start_date TEXT NOT NULL, end_date TEXT NOT NULL, description TEXT, FOREIGN KEY (employee_id) REFERENCES employees(employee_id))');

//Qualifications table
db.run('CREATE TABLE IF NOT EXISTS qualifications (qualification_id INTEGER PRIMARY KEY AUTOINCREMENT, qualification TEXT NOT NULL, qualification_code TEXT NOT NULL, description TEXT)');

//Functions table
db.run('CREATE TABLE IF NOT EXISTS functions (function_id INTEGER PRIMARY KEY AUTOINCREMENT, function TEXT NOT NULL, description TEXT NOT NULL)');

//Employees-qualifications table
db.run('CREATE TABLE IF NOT EXISTS employees_qualifications (employee_id INTEGER NOT NULL, qualification_id INT NOT NULL, expire_date TEXT NOT NULL, FOREIGN KEY (employee_id) REFERENCES employees(employee_id), FOREIGN KEY (qualification_id) REFERENCES qualifications(qualification_id))');

//Employees-functions table
db.run('CREATE TABLE IF NOT EXISTS employees_functions (function_id INTEGER NOT NULL, employee_id INT NOT NULL, FOREIGN KEY (function_id) REFERENCES functions(function_id), FOREIGN KEY (employee_id) REFERENCES employees(employee_id))');

//Assets-Assets types table
db.run('CREATE TABLE IF NOT EXISTS asset_assettype (asset_id INT, asset_type_id INT, FOREIGN KEY (asset_id) REFERENCES assets(asset_id), FOREIGN KEY (asset_type_id) REFERENCES assets_types(asset_type_id))');

// //Assets types table
// db.run('CREATE TABLE IF NOT EXISTS assets_types (type_id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT NOT NULL)');

// //Assets main table
// db.run('CREATE TABLE IF NOT EXISTS assets (asset_id INTEGER PRIMARY KEY AUTOINCREMENT, cs_asset_id TEXT NOT NULL, type TEXT, model TEXT, description TEXT, FOREIGN KEY (type) REFERENCES assets_types(type))');

// //Employee table - the status is used to show current and obsolete employees
// db.run('CREATE TABLE IF NOT EXISTS employees (employee_id INTEGER PRIMARY KEY AUTOINCREMENT, fname TEXT NOT NULL, lname TEXT NOT NULL, status TEXT NOT NULL)');

// //Employee's personal details table
// db.run('CREATE TABLE IF NOT EXISTS personal_details (employee_id INTEGER, phone TEXT, address TEXT, FOREIGN KEY (employee_id) REFERENCES employees (employee_id))');

// //Qualifications table
// db.run('CREATE TABLE IF NOT EXISTS qualifications (qualification_id INTEGER PRIMARY KEY AUTOINCREMENT, qualification TEXT NOT NULL, description TEXT)');

// //Employee's qualifications table
// db.run('CREATE TABLE IF NOT EXISTS employee_qualifications (employee_id INTEGER, qualification_id TEXT, FOREIGN KEY (employee_id) REFERENCES employees (employee_id), FOREIGN KEY (qualification_id) REFERENCES qualifications (qualification_id))');

// //Job's main table
// db.run('CREATE TABLE IF NOT EXISTS jobs (job_id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL)');
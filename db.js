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
db.run('CREATE TABLE IF NOT EXISTS clients (client_id INTEGER PRIMARY KEY AUTOINCREMENT, client_name TEXT NOT NULL UNIQUE, email TEXT, phone TEXT NOT NULL, address TEXT NOT NULL, city TEXT NOT NULL, state TEXT, postcode TEXT NOT NULL)');

//Assets table
db.run('CREATE TABLE IF NOT EXISTS assets (asset_id INTEGER PRIMARY KEY AUTOINCREMENT, cs_asset_id TEXT NOT NULL UNIQUE, asset_name TEXT NOT NULL, asset_type TEXT NOT NULL, description TEXT, FOREIGN KEY (asset_type) REFERENCES assets_types(asset_type_id))');

//Assets type table
db.run('CREATE TABLE IF NOT EXISTS assets_types (asset_type_id INTEGER PRIMARY KEY AUTOINCREMENT, asset_type TEXT NOT NULL UNIQUE, description TEXT NOT NULL)');

//Asset not available table
db.run('CREATE TABLE IF NOT EXISTS asset_not_available (asset_not_available_id INTEGER PRIMARY KEY AUTOINCREMENT, asset_id INTEGER NOT NULL, reason TEXT NOT NULL, start_date TEXT NOT NULL, end_date TEXT NOT NULL, description TEXT, FOREIGN KEY (asset_id) REFERENCES assets(asset_id))');

//Employees table
db.run('CREATE TABLE IF NOT EXISTS employees (employee_id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT NOT NULL, address TEXT NOT NULL, suburb TEXT NOT NULL, postcode INTEGER NOT NULL, phone TEXT NOT NULL, email TEXT NOT NULL)');

//Employees not available table
db.run('CREATE TABLE IF NOT EXISTS employee_not_available (employee_not_available_id INTEGER PRIMARY KEY AUTOINCREMENT, employee_id INTEGER NOT NULL, reason TEXT NOT NULL, start_date TEXT NOT NULL, end_date TEXT NOT NULL, description TEXT, FOREIGN KEY (employee_id) REFERENCES employees(employee_id))');

//Qualifications table
db.run('CREATE TABLE IF NOT EXISTS qualifications (qualification_id INTEGER PRIMARY KEY AUTOINCREMENT, qualification TEXT NOT NULL, qualification_code TEXT NOT NULL, description TEXT)');

//Functions table
db.run('CREATE TABLE IF NOT EXISTS functions (function_id INTEGER PRIMARY KEY AUTOINCREMENT, function TEXT NOT NULL, description TEXT NOT NULL)');

//Employees-qualifications table
db.run('CREATE TABLE IF NOT EXISTS employees_qualifications (employee_id INTEGER NOT NULL, qualification_id INT NOT NULL, expire_date TEXT NOT NULL, FOREIGN KEY (employee_id) REFERENCES employees(employee_id), FOREIGN KEY (qualification_id) REFERENCES qualifications(qualification_id))');

//Employees-functions table
db.run('CREATE TABLE IF NOT EXISTS employees_functions (function_id INTEGER NOT NULL, employee_id INT NOT NULL, FOREIGN KEY (function_id) REFERENCES functions(function_id), FOREIGN KEY (employee_id) REFERENCES employees(employee_id))');

//Assets-Assets types table
//db.run('CREATE TABLE IF NOT EXISTS asset_assettype (asset_id INT, asset_type_id INT, FOREIGN KEY (asset_id) REFERENCES assets(asset_id), FOREIGN KEY (asset_type_id) REFERENCES assets_types(asset_type_id))');

//Supervisors table
db.run('CREATE TABLE IF NOT EXISTS supervisors (supervisor_id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT NOT NULL, email TEXT, phone TEXT NOT NULL)');

//Reserve table
db.run('CREATE TABLE IF NOT EXISTS reserves (reserve_id INTEGER PRIMARY KEY AUTOINCREMENT, asset_id INTEGER, client_id INTEGER, supervisor_id INTEGER, start_date TEXT NOT NULL, final_date TEXT NOT NULL, status TEXT, FOREIGN KEY (asset_id) REFERENCES assets(asset_id), FOREIGN KEY (client_id) REFERENCES clients(client_id), FOREIGN KEY (supervisor_id) REFERENCES supervisors(supervisor_id))');

//Orders table
db.run('CREATE TABLE IF NOT EXISTS orders (order_id INTEGER PRIMARY KEY AUTOINCREMENT, reserve_id INTEGER, start_date TEXT NOT NULL, final_date TEXT NOT NULL, client_id INTEGER, supervisor_id INTEGER, address TEXT NOT NULL, assignar_number INTEGER, induction_req INTEGER NOT NULL, comments TEXT, FOREIGN KEY (reserve_id) REFERENCES reserves(reserve_id), FOREIGN KEY (client_id) REFERENCES clients(client_id), FOREIGN KEY (supervisor_id) REFERENCES supervisors(supervisor_id))');

//Jobs table
db.run('CREATE TABLE IF NOT EXISTS jobs (job_id INTEGER PRIMARY KEY AUTOINCREMENT, job_number INTEGER NOT NULL, order_id INTEGER, date TEXT NOT NULL, address TEXT NOT NULL, details TEXT NOT NULL, FOREIGN KEY (order_id) REFERENCES orders(order_id))');

//Allocations table
db.run('CREATE TABLE IF NOT EXISTS allocations (allocation_id INTEGER PRIMARY KEY AUTOINCREMENT, job_id INTEGER, asset_id INTEGER, function_id INTEGER, leave_yard_time TEXT NOT NULL, start_time_site TEXT NOT NULL, finish_time_site TEXT NOT NULL, back_yard_time TEXT NOT NULL, details TEXT, inducted INTEGER NOT NULL, FOREIGN KEY (function_id) REFERENCES functions(function_id), FOREIGN KEY (asset_id) REFERENCES assets(asset_id), FOREIGN KEY (job_id) REFERENCES jobs(job_id))');

//Asset location table
db.run('CREATE TABLE IF NOT EXISTS asset_location (asset_location_id INTEGER PRIMARY KEY AUTOINCREMENT, cs_asset_id TEXT NOT NULL, client TEXT NOT NULL, start_date TEXT NOT NULL, end_date TEXT NOT NULL, description TEXT NOT NULL, FOREIGN KEY (cs_asset_id) REFERENCES assets(cs_asset_id), FOREIGN KEY (client) REFERENCES clients(client_name))');

//Unavailability table
db.run('CREATE TABLE IF NOT EXISTS unavailability (unavailability_id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT NOT NULL, reason TEXT NOT NULL, description TEXT NOT NULL)');

//Asset taken table
db.run('CREATE TABLE IF NOT EXISTS asset_taken (asset_taken_id INTEGER PRIMARY KEY AUTOINCREMENT, asset_id INTEGER, date TEXT, FOREIGN KEY (asset_id) REFERENCES assets(asset_id))');

module.exports = db;
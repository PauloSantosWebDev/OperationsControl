const express = require('express'); //the require() function imports the Express framework, making its functionalities available.
const app = express(); //used to create an instance/object of the Express framework. This instance is a fresh object where you can start defining routes, middleware, and configuration.
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./db');
const port = 3000;

//Setting up view engine, templating and static files source
nunjucks.configure('views', {
    autoescape: true,
    express: app
})


app.set('view engine', 'njk'); //set nunjucks as the view engine

//Setting up static folders
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('public'));
app.use(express.static('views'));

//Middleware to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
  secret: 'cs-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

//Checking tables data
// db.all('SELECT * FROM assets', (err, rows) => {
//     if (err) {
//         throw err;
//     }

//     rows.forEach(row => {
//         console.log(row);
//     })
// })


//-----------------------------------------------------------------------
//Server listening

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

//-----------------------------------------------------------------------
//Routes

//Home page
app.get('/', (req, res) => {
    // res.render('index.njk', {title: 'Home page'})
    // res.render('daysheet.njk', {title: 'Home page'})
    res.render('formsdaysheet.njk', {title: 'Daysheet'})
})

//New client page
app.get('/newclient', (req, res) => {
    res.render('newclient.njk', {title: 'New Client'})
})

//New assets page
app.get('/newasset', (req, res) => {
    res.render('newasset.njk', {title: 'Asset Type'})
})

//New asset type page
app.get('/newassettype', (req, res) => {
    res.render('newassettype.njk', {title: 'Asset Type'})
})

//New employee page
app.get('/newemployee', (req, res) => {
    res.render('newemployee.njk', {title: 'New employee'})
})

//New function page
app.get('/newfunction', (req, res) => {
    res.render('newfunction.njk', {title: "New Function"})
})

//New qualification page
app.get('/newqualification', (req, res) => {
    res.render('newqualification.njk', {title: "New Qualification"})
})

//New asset location page
app.get('/newlocation', (req, res) => {
    res.render('newlocation.njk', {title: "New Asset Location"})
})

//New supervisor page
app.get('/newsupervisor', (req, res) => {
    res.render('newsupervisor.njk', {title: "New Supervisor"})
})

//Update/Delete assets form
app.get('/upddelasset', (req, res) => {
    res.render('upddelasset.njk', {title: "Update/Delete Assets"})
})

//Update/Delete assets type form
app.get('/upddelassettype', (req, res) => {
    res.render('upddelassettype.njk', {title: "Update/Delete Assets type"})
})

//Update/Delete client form
app.get('/upddelclient', (req, res) => {
    res.render('upddelclient.njk', {title: "Update/Delete Client"})
})

//Update/Delete employee form
app.get('/upddelemployee', (req, res) => {
    res.render('upddelemployee.njk', {title: "Update/Delete Employee"})
})

//Update/Delete function form
app.get('/upddelfunction', (req, res) => {
    res.render('upddelfunction.njk', {title: "Update/Delete Function"})
})

//Update/Delete qualification form
app.get('/upddelqualification', (req, res) => {
    res.render('upddelqualification.njk', {title: "Update/Delete Qualification"})
})

//New supervisor page
app.get('/upddelsupervisor', (req, res) => {
    res.render('upddelsupervisor.njk', {title: "Update/delete Supervisor"})
})

//Update location form
app.get('/updatelocation', (req, res) => {
    res.render('updatelocation.njk', {title: "Update Asset Location"})
})

//Update link asset to asset type form
app.get('/linkassettype', (req, res) => {
    res.render('linkassettype.njk', {title: "Link Asset-Asset type"})
})

//Update link employee to funciton form
app.get('/linkemployeefunction', (req, res) => {
    res.render('linkemployeefunction.njk', {title: "Link Employee-Function"})
})

//Update link employee to qualification form
app.get('/linkemployeequalification', (req, res) => {
    res.render('linkemployeequalification.njk', {title: "Link Employee-Qualification"})
})

//Employee's availability form
app.get('/availabilityemployee', (req, res) => {
    res.render('availabilityemployee.njk', {title: "Employees' availability"})
})

//Assets' availability form
app.get('/availabilityasset', (req, res) => {
    res.render('availabilityasset.njk', {title: "Assets' availability"})
})

//-------------------------------------------------------------------------------------
//Post methods

//Employees registration area
app.post('/newemployee', (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const suburb = req.body.suburb;
    const postcode = req.body.postcode;

    db.run('INSERT INTO employees (first_name, last_name, address, suburb, postcode, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?)', [fname, lname, email, phone, address, suburb, postcode], (err) => {
        if (err) {
            res.status(400).json({body: "Error inserting data into the employees' table."});
        } else {
            res.status(200).json({body: "Data inserted successfully into the employees' table."});
        }
    });
})

//Assets registration area
app.post('/newasset', (req, res) => {
    const craneServicesId = req.body.craneServicesId;
    const assetName = req.body.assetName;
    const assetType = req.body.assetType;
    const description = req.body.description;

    db.run('INSERT INTO assets (cs_asset_id, asset_name, asset_type, description) VALUES (?, ?, ?, ?)', [craneServicesId, assetName, assetType, description], (err) => {
        if (err) {
            res.status(400).json({body: "Error inserting data into the assets' table."});
        } else {
            res.status(200).json({body: "Data inserted successfully into the assets' table."});
        }
    });
})

//Asset types registration area
app.post('/newassettype', (req, res) => {
    const assetType = req.body.assetType;
    const description = req.body.description;

    db.run('INSERT INTO assets_types (asset_type, description) VALUES (?, ?)', [assetType, description], (err) => {
        if (err) {
            res.status(400).json({body: "Error inserting data into the assets type' table."});
        } else {
            res.status(200).json({body: "Data inserted successfully into the assets type' table."});
        }
    });
})

//Client registration area
app.post('/newclient', (req, res) => {
    const clientName = req.body.clientName;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const postcode = req.body.postcode;

    db.run('INSERT INTO clients (client_name, email, phone, address, city, state, postcode) VALUES (?, ?, ?, ?, ?, ?, ?)', [clientName, email, phone, address, city, state, postcode], (err) => {
        if (err) {
            res.status(400).json({body: "Error inserting data into the clients' table."});
        } else {
            res.status(200).json({body: "Data inserted successfully into the clients' table."});
        }
    });
})

//Functions registration area
app.post('/newfunction', (req, res) => {
    const func = req.body.func;
    const description = req.body.description;

    db.run('INSERT INTO functions (function, description) VALUES (?, ?)', [func, description], (err) => {
        if (err) {
            res.status(400).json({body: "Error inserting data into the functions' table."});
        } else {
            res.status(200).json({body: "Data inserted successfully into the functions' table."});
        }
    });
})

//Supervisors registration area
app.post('/newsupervisor', (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const phone = req.body.phone;

    db.run('INSERT INTO supervisors (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)', [fname, lname, email, phone], (err) => {
        if (err) {
            res.status(400).json({body: "Error inserting data into the supervisors' table."});
        } else {
            res.status(200).json({body: "Data inserted successfully into the supervisors' table."});
        }
    });
})

//Qualifications registration area
app.post('/newqualification', (req, res) => {
    const qualification = req.body.qualification;
    const qualificationCode = req.body.qualificationCode;
    const description = req.body.description;

    db.run('INSERT INTO qualifications (qualification, qualification_code, description) VALUES (?, ?, ?)', [qualification, qualificationCode, description], (err) => {
        if (err) {
            res.status(400).json({body: "Error inserting data into the qualifications' table."});
        } else {
            res.status(200).json({body: "Data inserted successfully into the qualifications' table."});
        }
    });
})

//Asset location registration area
app.post('/newlocation', (req, res) => {
    const csId = req.body.csId;
    const client = req.body.client;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const description = req.body.description;

    db.run('INSERT INTO asset_location (cs_asset_id, client, start_date, end_date, description) VALUES (?, ?, ?, ?, ?)', [csId, client, startDate, endDate, description], (err) => {
        if (err) {
            res.status(400).json({body: "Error inserting data into the asset locations' table."});
        } else {
            res.status(200).json({body: "Data inserted successfully into the asset locations' table."});
        }
    });
})
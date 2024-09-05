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
db.all('SELECT * FROM employees', (err, rows) => {
    if (err) {
        throw err;
    }

    rows.forEach(row => {
        console.log(row);
    })
})


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
    console.log('Print something');
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const suburb = req.body.suburb;
    const postcode = req.body.postcode;

    console.log(`The req.body is: ${fname}`);

    db.run('INSERT INTO employees (first_name, last_name, address, suburb, postcode, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?)', [fname, lname, email, phone, address, suburb, postcode], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Error inserting data in employees' table.");
        } else {
            res.status(200);
            console.log("Data inserted succssfully in employees' table.");
        }
    });
})
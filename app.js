const express = require('express'); //the require() function imports the Express framework, making its functionalities available.
const app = express(); //used to create an instance/object of the Express framework. This instance is a fresh object where you can start defining routes, middleware, and configuration.
const nunjucks = require('nunjucks');
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


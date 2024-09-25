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

// Checking tables data
// db.all('DROP TABLE asset_not_available');
// db.all('DROP TABLE unaval_employee');
// db.all('DROP TABLE employees_qualifications', (err, rows) => {
// db.all('SELECT * FROM employees_functions', (err, rows) => {
// db.all('INSERT INTO employees_qualifications (employee_id, qualification_id, expire_date) VALUES (2, 2, 25-09-2024)', (err, rows) => {
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
    db.all('SELECT asset_type FROM assets_types', (err, rows) => {
        if (err) {
            res.status(500).send('Database error.')
        }
        const toParse = rows.map(row => ({assetType: row.asset_type}));
        res.render('newasset.njk', {title: 'Asset Type', toParse})
    })
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
    db.all('SELECT cs_asset_id, asset_name FROM assets', (err, rows) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        const toParse = rows.map(row => ({csId: row.cs_asset_id, asset: row.asset_name}));
        db.all ('SELECT client_name FROM clients', (err, rows) => {
            if (err) {
                return res.status(500).send('Database error');
            }
            const toParse2 = rows.map(row => ({client: row.client_name}));
            res.render('newlocation.njk', {title: "New Asset Location", toParse, toParse2});
        })
    })
})

//New supervisor page
app.get('/newsupervisor', (req, res) => {
    res.render('newsupervisor.njk', {title: "New Supervisor"})
})

//Update/Delete assets form
app.get('/upddelasset', (req, res) => {      
    db.all('SELECT * FROM assets', (err, rows) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        const toParse = rows.map(row => ({assetId: row.asset_id, csId: row.cs_asset_id, assetName: row.asset_name, assetType: row.asset_type, description: row.description}));
        db.all('SELECT asset_type FROM assets_types', (err, rows) => {
            if (err) {
                return res.status(500).send('Database error');
            }
            const assetType = rows.map(row => ({assetType: row.asset_type}));
            res.render('upddelasset.njk', {title: "Update/Delete Assets", toParse, assetType});
        })
    })
})

//Update/Delete assets type form
app.get('/upddelassettype', (req, res) => {
    db.all('SELECT * FROM assets_types', (err, rows) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        const toParse = rows.map(row => ({assetTypeId: row.asset_type_id, assetType: row.asset_type, description: row.description}));
        res.render('upddelassettype.njk', {title: "Update/Delete Assets type", toParse});
    })
})

//Update/Delete client form
app.get('/upddelclient', (req, res) => {
    db.all('SELECT * FROM clients', (err, rows) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        const toParse = rows.map(row => ({clientId: row.client_id, clientName: row.client_name, email: row.email, phone: row.phone, address: row.address, city: row.city, state: row.state, postcode: row.postcode}));
        res.render('upddelclient.njk', {title: "Update/Delete Client", toParse});
    })
})

//Update/Delete employee form
app.get('/upddelemployee', (req, res) => {
    db.all('SELECT * FROM employees', (err, rows) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        const toParse = rows.map(row => ({employeeId: row.employee_id, firstName: row.first_name, lastName: row.last_name, address: row.address, suburb: row.suburb, postcode: row.postcode, phone: row.phone, email: row.email}))
        res.render('upddelemployee.njk', {title: "Update/Delete Employee", toParse});
    })
})

//Update/Delete function form
app.get('/upddelfunction', (req, res) => {
    db.all('SELECT * FROM functions', (err, rows) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        const toParse = rows.map(row => ({functionId: row.function_id, function: row.function, description: row.description}))
        res.render('upddelfunction.njk', {title: "Update/Delete Function", toParse});
    })
})

//Update/Delete qualification form
app.get('/upddelqualification', (req, res) => {
    db.all('SELECT * FROM qualifications', (err, rows) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        const toParse = rows.map(row => ({qualificationId: row.qualification_id, qualification: row.qualification, qualificationCode: row.qualification_code, description: row.description}))
        res.render('upddelqualification.njk', {title: "Update/Delete Qualification", toParse});
    })
})

//Update/delete supervisor page
app.get('/upddelsupervisor', (req, res) => {
    db.all('SELECT * FROM supervisors', (err, rows) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        const toParse = rows.map(row => ({supervisorId: row.supervisor_id, firstName: row.first_name, lastName: row.last_name, email: row.email, phone: row.phone}))
        res.render('upddelsupervisor.njk', {title: "Update/delete Supervisor", toParse});
    })
})

//Update location form
app.get('/updatelocation', (req, res) => {
    db.all('SELECT * FROM asset_location', (err, rows) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        const toParse = rows.map(row => ({assetLocationId: row.asset_location_id, csAssetId: row.cs_asset_id, client: row.client, startDate: row.start_date, endDate: row.end_date, description: row.description}));
        let csAssetIds = []
        toParse.forEach(e => csAssetIds.push(e.csAssetId));
        const placeholders = csAssetIds.map(() => '?').join(',');
        db.all(`SELECT cs_asset_id, asset_name FROM assets WHERE cs_asset_id IN (${placeholders})`, csAssetIds, (err, rows) => {
            if (err) {
                return res.status(500).send('Database error');
            }
            const toParse2 = rows.map(row => ({asset:row.asset_name, csId: row.cs_asset_id}));
            db.all('SELECT * FROM clients', (err, rows) => {
                if (err) {
                    return res.status(500).send('Database error');
                }
                const toParse3 = rows.map(row => ({client: row.client_name}));
                res.render('updatelocation.njk', {title: "Update Asset Location", toParse, toParse2, toParse3});
            })  
        })
    })
})

//Update/delete unavailability reasons
app.get('/upddelreason', (req, res) =>{
    db.all('SELECT * FROM unavailability', (err, rows) => {
        if (err) {
            res.status(500).send('Database error.');
        } else {
            const toParse = rows.map(row => ({id: row.unavailability_id, category: row.category, reason: row.reason, description: row.description}));
            res.render('upddelreason.njk', {title: "Update/delete reason", toParse});
        }
    })
})

//Update/delete asset availability
app.get('/upddelassetsavailability', (req, res) => {
    db.all('SELECT * FROM asset_not_available', (err, rows) => {
        if (err) {
            return res.status(500).send('Database error.');
        } else {
            const toParse = rows.map(row => ({id: row.asset_not_available_id, assetId: row.asset_id, reason: row.reason, sDate: row.start_date, eDate: row.end_date, description: row.description}));
            let assetName = [];
            for (let elem of rows) {
                assetName.push(elem.asset_id);
            }
            let placeholders = assetName.map(()=> '?').join(',');

            db.all(`SELECT cs_asset_id, asset_name FROM assets WHERE asset_id IN (${placeholders})`, assetName, (err, rows) => {
                if (err) {
                    return res.status(500).send('Database error. Trying to get assets from asset_id.');
                } else {
                    let index = 0;
                    toParse.forEach(e => {
                        Object.assign(e, rows[index]);
                        index++;
                    })
                    
                    res.render('upddelassetsavailability.njk', {title: "Update/delete Assets Availability", toParse})
                }
            })
        }
    })
})

//Update link asset to asset type form
app.get('/linkassettype', (req, res) => {
    res.render('linkassettype.njk', {title: "Link Asset-Asset type"})
})

//Update link employee to funciton form
app.get('/linkemployeefunction', (req, res) => {
    db.all('SELECT employee_id, first_name, last_name FROM employees ORDER BY first_name', (err, rows) => {
        if (err) {
           return res.status(500).send('Database error.');
        }
        const toParse = rows.map(row => ({employeeId: row.employee_id, firstName: row.first_name, lastName: row.last_name}));
        db.all('SELECT function_id, function FROM functions ORDER BY function', (err, rows) => {
            if (err) {
                return res.status(500).send('Database error.');
            }
            const toParse2 = rows.map(row => ({functionId: row.function_id, function: row.function}));
            db.all('SELECT * FROM employees_functions', (err, rows) => {
                if (err) {
                    return res.status(500).send('Database error.');
                }
                let array = [];
                let index = 0;
                for (let elem of rows) {
                    for (let e of toParse) {
                        if (elem.employee_id === e.employeeId) {
                            array.push({employee: e.firstName + ' ' + e.lastName});
                        }
                    }
                    for (let e of toParse2) {
                        if (elem.function_id === e.functionId) {
                            array[index].function = e.function;
                        }
                    }
                    index++;
                }
                res.render('linkemployeefunction.njk', {title: "Link Employee-Function", toParse, toParse2, array})
            })
        })
    })
})

//Update link employee to qualification form
app.get('/linkemployeequalification', (req, res) => {
    db.all('SELECT employee_id, first_name, last_name FROM employees ORDER BY first_name', (err, rows) => {
        if (err) {
           return res.status(500).send('Database error.');
        }
        const toParse = rows.map(row => ({employeeId: row.employee_id, firstName: row.first_name, lastName: row.last_name}));
        db.all('SELECT qualification_id, qualification FROM qualifications ORDER BY qualification', (err, rows) => {
            if (err) {
                return res.status(500).send('Database error.');
            }
            const toParse2 = rows.map(row => ({qualificationId: row.qualification_id, qualification: row.qualification}));
            db.all('SELECT * FROM employees_qualifications', (err, rows) => {
                if (err) {
                    return res.status(500).send('Database error.');
                }
                let array = [];
                let index = 0;
                for (let elem of rows) {
                    for (let e of toParse) {
                        if (elem.employee_id === e.employeeId) {
                            array.push({employee: e.firstName + ' ' + e.lastName});
                        }
                    }
                    for (let e of toParse2) {
                        if (elem.qualification_id === e.qualificationId) {
                            array[index].qualification = e.qualification;
                            array[index].expire = elem.expire_date;
                        }
                    }
                    index++;
                }
                res.render('linkemployeequalification.njk', {title: "Link Employee-Qualification", toParse, toParse2, array})
            })
        })
    })
})

//Employee's availability form
app.get('/availabilityemployee', (req, res) => {
    db.all('SELECT employee_id, first_name, last_name FROM employees', (err, rows) => {
        if (err) {
            return res.status(500).send('Database error.');
        } else {
            const toParse = rows.map(row => ({employeeId: row.employee_id, firstName: row.first_name, lastName: row.last_name}));
            db.all('SELECT reason FROM unavailability WHERE category = ?', ["employee"], (err, rows) => {
                if (err) {
                    return res.status(500).send('Database error.');
                } else {
                    const toParse2 = rows.map(row => ({reason: row.reason}));
                    return res.render('availabilityemployee.njk', {title: "Employees' availability", toParse, toParse2})
                }
            })
        }
    })
    // res.render('availabilityemployee.njk', {title: "Employees' availability"})
})

//Assets' availability form
app.get('/availabilityasset', (req, res) => {
    db.all('SELECT asset_id, asset_name FROM assets', (err, rows) => {
        if (err) {
            return res.status(500).send('Database error.');
        } else {
            const toParse = rows.map(row => ({assetId: row.asset_id, asset: row.asset_name}));
            db.all('SELECT reason FROM unavailability WHERE category = ?', ["asset"], (err, rows) => {
                if (err) {
                    return res.status(500).send('Database error.');
                } else {
                    const toParse2 = rows.map(row => ({reason: row.reason}));
                    return res.render('availabilityasset.njk', {title: "Assets' availability", toParse, toParse2})
                }
            })
        }
    })
})

//Reasons for asset and employee availability
app.get('/newreason', (req, res) => {
    res.render('newreason.njk', {title: "Unavailability Reasons"})
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

    db.run('INSERT INTO employees (first_name, last_name, address, suburb, postcode, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?)', [fname, lname, address, suburb, postcode, phone, email], (err) => {
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

//Unavailability Reasons for assets and employees
app.post('/newreason', (req, res) => {
    const category = req.body.category;
    const reason = req.body.reason;
    const description = req.body.description;

    db.run('INSERT INTO unavailability (category, reason, description) VALUES (?, ?, ?)', [category, reason, description], err => {
        if (err) {
            return res.status(500).send('Database error.');
        } else {
            return res.status(200).json({body: "Successfully registered"});
        }
    })
})

//Asset availability page
app.post('/availabilityasset', (req, res) => {
    const assetId = req.body.assetId;
    const reason = req.body.reason;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    const description = req.body.description;

    db.all('INSERT INTO asset_not_available (asset_id, reason, start_date, end_date, description) VALUES (?, ?, ?, ?, ?)', [assetId, reason, startDate, endDate, description], (err, rows) => {
        if (err) {
            return res.status(500).send('Database error.');
        } else {
            return res.status(200).json({body: "Successfully registered."});
        }
    })
})

//Employee availability page
app.post('/availabilityemployee', (req, res) => {
    const employeeId = req.body.employeeId;
    const reason = req.body.reason;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    const description = req.body.description;

    db.all('INSERT INTO employee_not_available (employee_id, reason, start_date, end_date, description) VALUES (?, ?, ?, ?, ?)', [employeeId, reason, startDate, endDate, description], (err, rows) => {
        if (err) {
            return res.status(500).send('Database error.');
        } else {
            return res.status(200).json({body: "Successfully registered."});
        }
    })
})

//------------------------------------------------------------------------------
//Update/detele area

//Update/delete assets
app.post('/upddelasset', (req, res) => {
    const asset = req.body.asset;
    const executionPath = req.body.executionPath;

    if (executionPath === "update") {
        const csId = req.body.csId;
        const assetName = req.body.assetName;
        const assetType = req.body.assetType;
        const description = req.body.description;

        db.all('SELECT asset_id FROM assets WHERE cs_asset_id = ?', [asset], (err, rows) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                const target = rows[0].asset_id;
                db.all('UPDATE assets SET cs_asset_id = ?, asset_name = ?, asset_type = ?, description = ? WHERE asset_id = ?', [csId, assetName, assetType, description, target], (err, rows) => {
                    if (err) {
                        return res.status(500).send('Database error');
                    }else {
                        res.status(200).json({body: "Successfully updated"});
                    }
                })
            }
        })
    } else if (executionPath === "delete") {
        db.all('SELECT asset_id FROM assets WHERE cs_asset_id = ?', [asset], (err, rows) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                const target = rows[0].asset_id;
                db.all('DELETE FROM assets WHERE asset_id = ?', [target], (err, rows) => {
                    if (err) {
                        return res.status(500).send('Database error');
                    }
                    res.status(200).json({body: "Successfully deleted"});
                })
            }
        })
    } else {
        db.all('SELECT * FROM assets WHERE cs_asset_id = ?', [asset], (err, rows) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                const toLoad = rows.map(row => ({csId: row.cs_asset_id, assetName: row.asset_name, assetType: row.asset_type, description: row.description}));
                res.status(200).json({body: toLoad[0]});
            }
        })
    }    
})

//Update/delete asset types
app.post('/upddelassettype', (req, res) => {
    const selectAssetType = req.body.selectAssetType;
    const executionPath = req.body.executionPath;

    if (executionPath === "update") {
        const assetType = req.body.assetType;
        const description = req.body.description;

        db.all('UPDATE assets_types SET asset_type = ?, description = ? WHERE asset_type = ?', [assetType, description, selectAssetType], (err) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                res.status(200).json({body: "Successfully updated"});
            }
        })
    } else if (executionPath === "delete") {
        db.all('DELETE FROM assets_types WHERE asset_type = ?', [selectAssetType], (err) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                res.status(200).json({body: "Successfully deleted"});
            }
        })
    } else {
        db.all('SELECT * FROM assets_types WHERE asset_type = ?', [selectAssetType], (err, rows) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                const toLoad = rows.map(row => ({assetType: row.asset_type, description: row.description}));
                res.status(200).json({body: toLoad[0]});
            }
        })
    }  
})

//Update/delete clients
app.post('/upddelclient', (req, res) => {
    const selectClient = req.body.client;
    const executionPath = req.body.executionPath;

    if (executionPath === "update") {
        const clientName = req.body.clientName;
        const email = req.body.email;
        const phone = req.body.phone;
        const address = req.body.address;
        const city = req.body.city;
        const state = req.body.state;
        const postcode = req.body.postcode;

        db.all('UPDATE clients SET client_name = ?, email = ?, phone = ?, address = ?, city = ?, state = ?, postcode = ? WHERE client_name = ?', [clientName, email, phone, address, city, state, postcode, selectClient], (err) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                res.status(200).json({body: "Successfully updated"});
            }
        })
    } else if (executionPath === "delete") {
        db.all('DELETE FROM clients WHERE client_name = ?', [selectClient], (err) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                res.status(200).json({body: "Successfully deleted"});
            }
        })
    } else {
        db.all('SELECT * FROM clients WHERE client_name = ?', [selectClient], (err, rows) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                const toLoad = rows.map(row => ({clientId: row.client_id, clientName: row.client_name, email: row.email, phone: row.phone, address: row.address, city: row.city, state: row.state, postcode: row.postcode}));
                res.status(200).json({body: toLoad[0]});
            }
        })
    }  
})

//Update/delete employee
app.post('/upddelemployee', (req, res) => {
    const selectEmployee = req.body.employee;
    const executionPath = req.body.executionPath;

    if (executionPath === "update") {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const phone = req.body.phone;
        const address = req.body.address;
        const suburb = req.body.suburb;
        const postcode = req.body.postcode;

        db.all('UPDATE employees SET first_name = ?, last_name = ?, address = ?, suburb = ?, postcode = ?, phone = ?, email = ? WHERE CONCAT(first_name, last_name) = ?', [firstName, lastName, address, suburb, postcode, phone, email, selectEmployee], (err) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                res.status(200).json({body: "Successfully updated"});
            }
        })
    } else if (executionPath === "delete") {
        db.all('DELETE FROM employees WHERE CONCAT(first_name, last_name) = ?', [selectEmployee], (err) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                res.status(200).json({body: "Successfully deleted"});
            }
        })
    } else {
        db.all('SELECT *, CONCAT(first_name, last_name) as full_name FROM employees WHERE full_name = ?', [selectEmployee], (err, rows) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                const toLoad = rows.map(row => ({firstName: row.first_name, lastName: row.last_name, email: row.email, phone: row.phone, address: row.address, suburb: row.suburb, postcode: row.postcode}));
                res.status(200).json({body: toLoad[0]});
            }
        })
    }  
})

//Update/delete functions
app.post('/upddelfunction', (req, res) => {
    const selectFunction = req.body.selectFunction;
    const executionPath = req.body.executionPath;

    if (executionPath === "update") {
        const functionDetail = req.body.functionDetail;
        const description = req.body.description;

        db.all('UPDATE functions SET function = ?, description = ? WHERE function = ?', [functionDetail, description, selectFunction], (err) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                res.status(200).json({body: "Successfully updated"});
            }
        })
    } else if (executionPath === "delete") {
        db.all('DELETE FROM functions WHERE function = ?', [selectFunction], (err) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                res.status(200).json({body: "Successfully deleted"});
            }
        })
    } else {
        db.all('SELECT * FROM functions WHERE function = ?', [selectFunction], (err, rows) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                const toLoad = rows.map(row => ({function: row.function, description: row.description}));
                res.status(200).json({body: toLoad[0]});
            }
        })
    }  
})

//Update/delete supervisors
app.post('/upddelsupervisor', (req, res) => {
    const selectSupervisor = req.body.selectSupervisor;
    const executionPath = req.body.executionPath;

    if (executionPath === "update") {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const phone = req.body.phone;

        db.all('UPDATE supervisors SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE CONCAT(first_name, last_name) = ?', [firstName, lastName, email, phone, selectSupervisor], (err) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                res.status(200).json({body: "Successfully updated"});
            }
        })
    } else if (executionPath === "delete") {
        db.all('DELETE FROM supervisors WHERE CONCAT(first_name, last_name) = ?', [selectSupervisor], (err) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                res.status(200).json({body: "Successfully deleted"});
            }
        })
    } else {
        db.all('SELECT * FROM supervisors WHERE CONCAT(first_name, last_name) = ?', [selectSupervisor], (err, rows) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                const toLoad = rows.map(row => ({firstName: row.first_name, lastName: row.last_name, email: row.email, phone: row.phone}));
                res.status(200).json({body: toLoad[0]});
            }
        })
    }  
})

//Update/delete qualification
app.post('/upddelqualification', (req, res) => {
    const selectQualification = req.body.selectQualification;
    const executionPath = req.body.executionPath;

    if (executionPath === "update") {
        const qualification = req.body.qualification;
        const qualificationCode = req.body.qualificationCode;
        const description = req.body.description;

        db.all('UPDATE qualifications SET qualification = ?, qualification_code = ?, description = ? WHERE qualification = ?', [qualification, qualificationCode, description, selectQualification], (err) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                res.status(200).json({body: "Successfully updated"});
            }
        })
    } else if (executionPath === "delete") {
        db.all('DELETE FROM qualifications WHERE qualification = ?', [selectQualification], (err) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                res.status(200).json({body: "Successfully deleted"});
            }
        })
    } else {
        db.all('SELECT * FROM qualifications WHERE qualification = ?', [selectQualification], (err, rows) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                const toLoad = rows.map(row => ({qualification: row.qualification, qualificationCode: row.qualification_code, description: row.description}));
                res.status(200).json({body: toLoad[0]});
            }
        })
    }  
})

//Update/delete location
app.post('/updatelocation', (req, res) => {
    const selectAsset = req.body.asset;
    const executionPath = req.body.executionPath;

    if (executionPath === "update") {
        const client = req.body.client;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const description = req.body.description;

        db.all('UPDATE asset_location SET client = ?, start_date = ?, end_date = ?, description = ? WHERE cs_asset_id = ?', [client, startDate, endDate, description, selectAsset], (err) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                res.status(200).json({body: "Successfully updated"});
            }
        })
    } else if (executionPath === "delete") {
        db.all('DELETE FROM asset_location WHERE cs_asset_id = ?', [selectAsset], (err) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                res.status(200).json({body: "Successfully deleted"});
            }
        })
    } else {
        db.all('SELECT * FROM asset_location WHERE cs_asset_id = ?', [selectAsset], (err, rows) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                const toLoad = rows.map(row => ({client: row.client, startDate: row.start_date, endDate: row.end_date, description: row.description}));
                return res.status(200).json({body: toLoad[0]});
            }
        })
    }  
})

//Update/delete unavailability reasons
app.post('/upddelreason', (req, res) => {
    const selectRegister = req.body.selectRegister;
    const executionPath = req.body.executionPath;

    if (executionPath === "update") {
        const category = req.body.category;
        const reason = req.body.reason;
        const description = req.body.description;

        db.all('UPDATE unavailability SET category = ?, reason = ?, description = ? WHERE unavailability_id = ?', [category, reason, description, selectRegister], (err) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                res.status(200).json({body: "Successfully updated"});
            }
        })
    } else if (executionPath === "delete") {
        db.all('DELETE FROM unavailability WHERE unavailability_id = ?', [selectRegister], (err) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                res.status(200).json({body: "Successfully deleted"});
            }
        })
    } else {
        db.all('SELECT * FROM unavailability WHERE unavailability_id = ?', [selectRegister], (err, rows) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                const toLoad = rows.map(row => ({category: row.category, reason: row.reason, description: row.description}));
                res.status(200).json({body: toLoad[0]});
            }
        })
    }
})

//-------------------------------------------------------------------
//Link area

//Link employee to function
app.post('/linkemployeefunction', (req, res) => {
    const path = req.body.path;
    
    if (path === 'unlink') {
        const employee = req.body.employee;
        const f = req.body.f;

        db.all("SELECT employee_id FROM employees WHERE CONCAT(first_name,' ',last_name) = ?", [employee], (err, rows) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                let targetEmployee = rows[0].employee_id;
                db.all('SELECT function_id FROM functions WHERE function = ?', [f], (err, rows) => {
                  if (err) {
                    return res.status(500).send('Database error');
                  } else {
                    let targetFunction = rows[0].function_id;
                    db.run('DELETE FROM employees_functions WHERE employee_id = ? AND function_id = ?', [targetEmployee, targetFunction], err => {
                        if (err) {
                            return res.status(500).send('Database error');
                        } else {
                            return res.status(200).json({body: "Sucessfully unlinked"})
                        }
                    })
                  }
                })
            }
        })

    } else {
        const employeeId = req.body.employeeId;
        const functionId = req.body.functionId;
        let createLink = true;

        db.all('SELECT * FROM employees_functions WHERE employee_id = ?', [employeeId], (err, rows) => {
            if (err) {
                return res.status(500).send('Database error.');
            } else {
                for (let row of rows) {
                    if (row.function_id == functionId) {
                        createLink = false;
                        return res.status(200).json({body: "Link already created."});
                    }
                }
                if (createLink) {
                    db.run('INSERT INTO employees_functions(function_id, employee_id) VALUES (?, ?)', [functionId, employeeId], err =>{
                        if (err) {
                            return res.status(500).send('Database error.');
                        } else {
                            return res.status(200).json({body: "Successfully linked."});
                        }
                    })
                }
            }
        })
    }
})

//Link employee to qualification
app.post('/linkemployeequalification', (req, res) => {
    const path = req.body.path;
    
    if (path === 'unlink') {
        const employee = req.body.employee;
        const q = req.body.q;

        db.all("SELECT employee_id FROM employees WHERE CONCAT(first_name,' ',last_name) = ?", [employee], (err, rows) => {
            if (err) {
                return res.status(500).send('Database error');
            } else {
                let targetEmployee = rows[0].employee_id;
                db.all('SELECT qualification_id FROM qualifications WHERE qualification = ?', [q], (err, rows) => {
                  if (err) {
                    return res.status(500).send('Database error');
                  } else {
                    let targetQualification = rows[0].qualification_id;
                    db.run('DELETE FROM employees_qualifications WHERE employee_id = ? AND qualification_id = ?', [targetEmployee, targetQualification], err => {
                        if (err) {
                            return res.status(500).send('Database error');
                        } else {
                            return res.status(200).json({body: "Sucessfully unlinked"})
                        }
                    })
                  }
                })
            }
        })

    } else {
        const employeeId = req.body.employeeId;
        const qualificationId = req.body.qualificationId;
        const expire = req.body.expire;
        let createLink = true;

        db.all('SELECT * FROM employees_qualifications WHERE employee_id = ?', [employeeId], (err, rows) => {
            if (err) {
                return res.status(500).send('Database error.');
            } else {
                for (let row of rows) {
                    if (row.qualification_id == qualificationId) {
                        createLink = false;
                        return res.status(200).json({body: "Link already created."});
                    }
                }
                if (createLink) {
                    db.run('INSERT INTO employees_qualifications(employee_id, qualification_id, expire_date) VALUES (?, ?, ?)', [employeeId, qualificationId, expire], err =>{
                        if (err) {
                            return res.status(500).send('Database error.');
                        } else {
                            return res.status(200).json({body: "Successfully linked."});
                        }
                    })
                }
            }
        })
    }
})
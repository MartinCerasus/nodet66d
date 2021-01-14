const express = require('express');
const app = express();
const mysql = require('mysql')

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const connection = mysql.createConnection({
host:'',
user:'root',
database:'node',
password:''
})




const pingController = require('./api/controllers/pingController');
app.get('/api/ping', pingController.ping);







// GET - teachers
// Required: none
// Optional: none
app.get('/api/teachers', (req, res) => {
    //console.log(req.params.id);
    const queryString = 'select * from teachers'
    connection.query(queryString, (err, rows, fields) =>{
    if (err) {
        console.log('Failed to query' + err)
        res.sendStatus(400)
        return
    }
    console.log('success');
    res.json(rows)
    })
});


// GET - teachers
// Required: id
// Optional: none
app.get('/api/teachers/:id', (req, res) => {
    //console.log(req.params.id);
    const userId = req.params.id
    const queryString = 'select * from teachers where id = ?'
    connection.query(queryString, [userId], (err, rows, fields) =>{
    if (err) {
        console.log('Failed to query' + err)
        res.sendStatus(400)
        return
    }  
    console.log('success');
    res.json(rows)
    })
});

// POST - teachers
// Required: firstName, lastName, email, password
// Optional: none
app.post('/api/teachers', (req, res) => {
    const firstName = typeof(req.body.firstName) === 'string' && req.body.firstName.trim().length > 0 ? req.body.firstName : false;
    const lastName = typeof(req.body.lastName) === 'string' && req.body.lastName.trim().length > 0 ? req.body.lastName : false;
    const email = typeof(req.body.email) === 'string' && req.body.email.trim().length > 0 ? req.body.email : false;
    const password = typeof(req.body.password) === 'string' && req.body.password.trim().length > 3 ? req.body.password : false;

    if(firstName && lastName && email && password) {
        const queryString = 'INSERT INTO teachers(firstName,lastName,email,password) VALUES (?,?,?,?)'
            connection.query(queryString, [firstName,lastName,email,password], (err, rows, fields) =>{
            if (err) {
                console.log('Failed to insert to teachers' + err)
                res.sendStatus(400)
                return
            }  
         })
        res.status(201).json({
            success: true
    });
 
   } else {
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
            });
    }
});

// PUT - teachers
// Required: id
// Optional: firstName, lastName, email, password
app.put('/api/teachers/:id', (req, res) => {
    const id = req.params.id
    const firstName = typeof(req.body.firstName) === 'string' && req.body.firstName.trim().length > 0 ? req.body.firstName : false;
    const lastName = typeof(req.body.lastName) === 'string' && req.body.lastName.trim().length > 0 ? req.body.lastName : false;
    const email = typeof(req.body.email) === 'string' && req.body.email.trim().length > 0 ? req.body.email : false;
    const password = typeof(req.body.password) === 'string' && req.body.password.trim().length > 3 ? req.body.password : false;

    if(id) {
        if(firstName) { 
            connection.query('UPDATE teachers SET firstName = ? where id = ?', [firstName,id])
        }
        if(lastName) {
            connection.query('UPDATE teachers SET lastName = ? where id = ?', [lastName,id])
        } 
        if(email) {
            connection.query('UPDATE teachers SET email = ? where id = ?', [email,id])
        } 
        if(password) {
            connection.query('UPDATE teachers SET password = ? where id = ?', [password,id])
        }  

        res.status(200).json({
            success: true

        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
});

// DELETE - teachers
// 
app.delete('/api/teachers/:id', (req, res) => {
    //const id = typeof(req.body.id) === 'number' ? req.body.id : false;
    const id = req.params.id
    if(id || id === 0) {
        const queryString = 'delete from teachers where id = ?'
        connection.query(queryString, [id])

        res.status(200).json({
            success: true,

        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
});


// classes

// GET - teachers
// Required: none
// Optional: none
app.get('/api/classes', (req, res) => {
    //console.log(req.params.id);
    const queryString = 'select * from classes'
    connection.query(queryString, (err, rows, fields) =>{
    if (err) {
        console.log('Failed to query' + err)
        res.sendStatus(400)
        return
    }
    console.log('success');
    res.json(rows)
    })
});


// GET - classes
// Required: id
// Optional: none
app.get('/api/classes/:id', (req, res) => {
    //console.log(req.params.id);
    const userId = req.params.id
    const queryString = 'select * from classes where id = ?'
    connection.query(queryString, [userId], (err, rows, fields) =>{
    if (err) {
        console.log('Failed to query' + err)
        res.sendStatus(400)
        return
    }  
    console.log('success');
    res.json(rows)
    })
});

app.post('/api/classes', (req, res) => {
    const className = typeof(req.body.className) === 'string' && req.body.className.trim().length > 0 ? req.body.className : false;
    const mandatory = typeof(req.body.mandatory) === 'string' && req.body.mandatory.trim().length > 0 ? req.body.mandatory : false;


    if(className && mandatory) {
        const queryString = 'INSERT INTO classes(className,mandatory) VALUES (?,?)'
            connection.query(queryString, [className,mandatory], (err, rows, fields) =>{
            if (err) {
                console.log('Failed to insert to teachers' + err)
                res.sendStatus(400)
                return
            }  
         })

        res.status(201).json({
            success: true,
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
});



app.put('/api/classes/:id', (req, res) => {
    const id = req.params.id
    const className = typeof(req.body.className) === 'string' && req.body.className.trim().length > 0 ? req.body.className : false;
    const mandatory = typeof(req.body.mandatory) === 'string' && req.body.mandatory.trim().length > 0 ? req.body.mandatory : false;


    if(id) {
        if(className) { 
            connection.query('UPDATE classes SET className = ? where id = ?', [className,id])
        }
        if(mandatory) {
            connection.query('UPDATE classes SET mandatory = ? where id = ?', [mandatory,id])
        } 
        res.status(200).json({
            success: true,
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
});

app.delete('/api/classes/:id', (req, res) => {
    const id = req.params.id
    if(id || id === 0) {
        const queryString = 'delete from classes where id = ?'
        connection.query(queryString, [id])

        res.status(200).json({
            success: true,

        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
});


// kolmas endpoint


// GET - homeworks
// Required: none
// Optional: none
app.get('/api/homeworks', (req, res) => {
    //console.log(req.params.id);
    const queryString = 'select * from homeworks'
    connection.query(queryString, (err, rows, fields) =>{
    if (err) {
        console.log('Failed to query' + err)
        res.sendStatus(400)
        return
    }
    console.log('success');
    res.json(rows)
    })
});


// GET - homeworks
// Required: id
// Optional: none
app.get('/api/homeworks/:id', (req, res) => {
    //console.log(req.params.id);
    const userId = req.params.id
    const queryString = 'select * from homeworks where id = ?'
    connection.query(queryString, [userId], (err, rows, fields) =>{
    if (err) {
        console.log('Failed to query' + err)
        res.sendStatus(400)
        return
    }  
    console.log('success');
    res.json(rows)
    })
});

// POST - homeworks
// Required: HwName, forClass, due
// Optional: none
app.post('/api/homeworks', (req, res) => {
    const HwName = typeof(req.body.HwName) === 'string' && req.body.HwName.trim().length > 0 ? req.body.HwName : false;
    const forClass = typeof(req.body.forClass) === 'string' && req.body.forClass.trim().length > 0 ? req.body.forClass : false;
    const due = typeof(req.body.due) === 'string' && req.body.due.trim().length > 0 ? req.body.due : false;

    if(HwName && forClass && due) {
        const queryString = 'INSERT INTO homeworks(HwName,forClass,due) VALUES (?,?,?)'
            connection.query(queryString, [HwName,forClass,due], (err, rows, fields) =>{
            if (err) {
                console.log('Failed to insert to teachers' + err)
                res.sendStatus(400)
                return
            }  
         })

        res.status(201).json({
            success: true,
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
});

// PUT - homeworks
// Required: id
// Optional: HwName, forClass, due
app.put('/api/homeworks/:id', (req, res) => {
    const id = req.params.id
    const HwName = typeof(req.body.HwName) === 'string' && req.body.HwName.trim().length > 0 ? req.body.HwName : false;
    const forClass = typeof(req.body.forClass) === 'string' && req.body.forClass.trim().length > 0 ? req.body.forClass : false;
    const due = typeof(req.body.due) === 'string' && req.body.due.trim().length > 0 ? req.body.due : false;

    if(id) {
        if(HwName) { 
            connection.query('UPDATE homeworks SET HwName = ? where id = ?', [HwName,id])
        }
        if(forClass) {
            connection.query('UPDATE homeworks SET forClass = ? where id = ?', [forClass,id])
        } 
        if(due) {
            connection.query('UPDATE homeworks SET due = ? where id = ?', [due,id])
        }   
        res.status(200).json({
            success: true,

        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
});

// DELETE - homeworks
// 
app.delete('/api/homeworks/:id', (req, res) => {
    const id = req.params.id
    if(id || id === 0) {
        const queryString = 'delete from homeworks where id = ?'
        connection.query(queryString, [id])

        res.status(200).json({
            success: true,

        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
});



app.listen(3000, "0.0.0.0");

//app.listen(3000, () => {
//    console.log('Server running');
//}
//);

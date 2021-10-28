const express = require('express');
const app = express();
const port = 3000;
const con = require('./db');
global.con = con //global variable
const home_routes = require('./routes/home_routes');
const admin_routes = require('./routes/admin_routes');
const teacher_routes = require('./routes/teacher_routes');
const student_routes = require('./routes/student_routes');
const path = require('path');

//app.use(express.json());




//**************************
const cors = require('cors');
app.use(cors());
//************************** 

//********************************
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
//********************************

app.use('/home', home_routes);
//app.use('/admin', admin_routes);
app.use('/teacher', teacher_routes);
app.use('/student', student_routes);

app.use(express.static(path.join(__dirname, 'public/images')));

app.listen(port, (err) => console.log(`Server is creating at port: ${port}`));

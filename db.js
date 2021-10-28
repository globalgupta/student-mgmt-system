const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'student_mgmt_db'
});


con.connect((err) => {
    if(!err){
        console.log('Database connected !!!');
    }
    else{
        console.log('Database not connected !!!');
    }
});

module.exports = con;


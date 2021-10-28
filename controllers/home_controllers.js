

const jwt = require('jsonwebtoken');
const con = require('../db');
//let a=10

exports.login = ((req, res) => {
    console.log(req.body)
    con.query('SELECT * FROM users WHERE email=? AND password=?', [req.body.email, req.body.password], (err, result) => {
        if (result.length > 0) {
            const jwtToken = jwt.sign(
                {
                    id: result[0].id,
                    email: result[0].email,

                },
                'SECRET')
            console.log(result[0])
            return res.status(200).json({
                status: 'SUCCESS',
                statusCode: 200,
                message: 'User successfully logged in',
                data: {
                    token: jwtToken,
                    usertype: result[0].usertype,  //from db
                    id: result[0].id, //from db
                    email: result[0].email  //from db
                },

            });
        }
        else {
            return res.status(400).json({
                status: 'FAILED',
                message: 'Incorrect email and password',
            });
        }
    });
});




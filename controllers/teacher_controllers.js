const con = require("../db");

exports.addTeacher = ((req, res) => {
    try {
        console.log(req.files);
        if (req.files.length <= 0) {
            return res.status(422).json({
                status: 'FAILED',
                statusCode: 422,
                message: 'Image is required.',
            });

        }

        con.query('INSERT INTO users(email , password , usertype) VALUES(?,?,?) ', [req.body.email, req.body.password, 'teacher'], (err, user) => {
            console.log(user)
            if (err) {
                return res.status(400).json({
                    status: 'FAILED',
                    statusCode: 400,
                    message: 'SOMETHING WENT WRONG !!!',
                    err: err.message
                });

            }
            if (user && user.affectedRows > 0) {
                var userId = user.insertId
                con.query('INSERT INTO teachers(u_id, name, empId, mobile, age, qualification, exp, address, city, state, pin, image) VALUES(?,?,?,?,?,?,?,?,?,?,?,?) ',
                    [userId, req.body.name, req.body.empId, req.body.mobile, req.body.age, req.body.qualification, req.body.exp, req.body.address, req.body.city, req.body.state, req.body.pin, req.files[0].filename], (error, result) => {
                        console.log(result)
                        if (error) {
                            return res.status(400).json({
                                status: 'FAILED',
                                statusCode: 400,
                                message: 'Teacher data not inserted into db',
                                err: err.message
                            });

                        }
                        if (result && result.affectedRows > 0) {

                            return res.status(200).json({
                                status: 'SUCCESS',
                                statusCode: 200,
                                message: 'Teacher successfully added...',
                                data: {
                                    id: result.insertId,
                                }

                            });
                        }
                        else {
                            return res.status(400).json({
                                status: 'FAILED',
                                statusCode: 400,
                                message: 'Teacher failed to add !!!',
                            });
                        }
                    });
            } else {
                return res.status(400).json({
                    status: 'FAILED',
                    statusCode: 400,
                    message: 'SOMETHING WENT WRONG !!!',
                    err: err.message
                });
            }
        })
    } catch (err) {
        return res.status(400).json({
            status: 'FAILED',
            statusCode: 400,
            message: 'SOMETHING WENT WRONG',
            err: err.message
        });
    }

});


exports.listTeacher = ((req, res) => {
    try {
        con.query('SELECT teachers.*, users.email from teachers INNER JOIN users ON teachers.u_id = users.id', (err, data) => {
            if (err) {
                return res.status(400).json({
                    status: 'FAILED',
                    statusCode: 400,
                    message: 'Unable to QUERY the teacher records to DB.',
                    err: err.message
                });

            }
            console.log(data)
            if (data.length <= 0) {
                return res.status(404).json({
                    status: 'FAILED',
                    statusCode: 404,
                    message: 'NO RECORD FOUND'
                });
            }
            else {
                return res.status(200).json({
                    status: 'SUCCESS',
                    statusCode: 200,
                    message: 'DATA FETCHED SUCCESFULLY !!!',
                    data: data
                });
            }

        });
    } catch {
        res.status(400).json({
            status: 'FAILED',
            statusCode: 400,
            message: 'SOMETHING WENT WRONG !!!'
        });
    }
});


exports.delTeacher = ((req, res) => {
    try {
        con.query('DELETE FROM users where id = ?', [req.params.u_id], (err, data) => {
            if (err) {
                return res.status(400).json({
                    status: 'FAILED',
                    statusCode: 400,
                    message: 'Unable to delete the record from DB',
                    err: err.message
                })
            }
            console.log(data)   
            if (data.affectedRows > 0) {
                return res.status(200).json({
                    status: 'SUCCESS',
                    statusCode: 200,
                    message: 'Record deleted from Teachers',
                    data: data

                })
            }
            else {
                return res.status(400).json({
                    status: 'FAILED',
                    statusCode: 404,
                    message: 'NO RECORD FOUND'
                })
            }

        });

    } catch {
        res.status(400).json({
            status: 'FAILED',
            statusCode: 400,
            message: 'SOMETHING WENT WRONG !!!'
        })
    }
});


exports.updateTeacher = ((req, res) => {
    try {
        dataToUpdate = {};
        if(req.body.name){
            dataToUpdate.name = req.body.name;
        }
        if(req.body.age){
            dataToUpdate.age = req.body.age;
        }
        con.query('UPDATE teachers SET ? WHERE id = ?', [dataToUpdate, req.body.name, req.body.mobile, req.body.id], (err, data) => {
            if(err) {
                res.status(400).json({
                    status: 400,
                    statusCode: 400,
                    message: 'SOMETHING WENT WRONG',
                    err: err.message
                });
            }
            //console.log(data)
            else if(data.affectedRows > 0){
                res.status(200).json({
                    status: 'SUCCESS',
                    statusCode: 200,
                    message: 'Teacher details succesfully updated',
                    data: data
                });
            }
            else{
                res.status(404).json({
                    status: 'FAILED',
                    statusCode: 404,
                    message: 'NO RECORD FOUND'
                });
            }
        });
    } catch {
        res.status(400).json({
            status: 'FAILED',
            statusCode: 400,
            message: 'SOMETHING WENT WRONG !!!'
        });
    }
});
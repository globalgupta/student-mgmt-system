const con = require("../db");

exports.addStudent = ((req, res) => {
    try {
        console.log(req.body);
        console.log(req.files);
        if (req.files.length <= 0) {
            return res.status(422).json({
                status: 'FAILED',
                statusCode: 422,
                message: 'Image is required.',
            });

        }

        con.query('INSERT INTO users(email, password , usertype) VALUES(?,?,?) ',
            [req.body.email, req.body.password, 'student'], (err, user) => {
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
                    var userId = user.insertId;

                    con.query('INSERT INTO students(u_id, t_id, name, roll, age, course, batch, mobile, father_name, father_mobile, address, city, state, pin, image) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ',
                        [userId, req.body.t_id, req.body.name, req.body.roll, req.body.age, req.body.course, req.body.batch, req.body.mobile, req.body.father_name, req.body.father_mobile, req.body.address, req.body.city, req.body.state, req.body.pin, req.files[0].path], (error, result) => {
                            console.log(result)
                            if (error) {
                                return res.status(400).json({
                                    status: 'FAILED',
                                    statusCode: 400,
                                    message: 'Student data not inserted into db',
                                    err: error.message
                                });

                            }
                            if (result && result.affectedRows > 0) {

                                return res.status(200).json({
                                    status: 'SUCCESS',
                                    statusCode: 200,
                                    message: 'Student successfully added...',
                                    data: {
                                        id: result.insertId,
                                    }

                                });
                            }
                            else {
                                return res.status(400).json({
                                    status: 'FAILED',
                                    statusCode: 400,
                                    message: 'Student failed to add !!!',
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

exports.listStudent = ((req, res) => {
    try {
        con.query('SELECT students.*, users.email from students INNER JOIN users ON students.u_id = users.id WHERE t_id = ?', [req.params.t_id], (err, data) => {
            if (err) {
                return res.status(400).json({
                    status: 'FAILED',
                    statusCode: 400,
                    message: 'Unable to QUERY the student records to DB.',
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
    }
    catch {
        return res.status(400).json({
            status: 'FAILED',
            statusCode: 400,
            message: 'SOMETHING WENT WRONG !!!',
        });
    }

});


exports.delStudent = ((req, res) => {
    try {
        res.status(400).json({
            status: 'FAILED',
            statusCode: 400,
            message: 'You are not authorized to delete student data.'
        })
        // con.query('DELETE FROM users WHERE id = ?', [req.params.u_id], (err, data) => {
        //     if (err) {
        //         res.status(400).json({
        //             status: 'FAILED',
        //             statusCode: 400,
        //             message: 'Unable to delete the record from DB',
        //             err: err.message
        //         })
        //     }
        //     console.log(data)
        //     if (data.affectedRows > 0) {
        //         res.status(200).json({
        //             status: 'SUCESSS',
        //             statusCode: 200,
        //             message: 'Record deleted from Students'
        //         })
        //     }
        //     else {
        //         res.status(404).json({
        //             status: 'FAILED',
        //             statusCode: 404,
        //             message: 'NO RECORD FOUND'
        //         })
        //     }
        //});
    } catch {
        res.status(400).json({
            status: 'FAILED',
            statusCode: 400,
            message: 'SOMETHING WENT WRONG!!!'
        })
    }
});
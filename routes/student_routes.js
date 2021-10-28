const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/jwt-validator');
const studentController = require('../controllers/student_controllers');

const fs = require('fs');
var multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var path = "./public/images/"
        //Create folder if does not exist
        fs.mkdirSync(path, { recursive: true })
        cb(null, path, function (err, succ) {
            if (err)
                throw err
        });
    },
    filename: function (req, file, cb) {
        var name = (Date.now() + '_' + file.originalname);
        name = name.replace(/ /g, '-');
        cb(null, name, function (err, succ1) {
            if (err)
                throw err
        });
    }
});
const upload = multer({ storage: storage, limits: 1000000 });

router.post('/addStudent', validateToken, upload.any(), studentController.addStudent);  //validateToken is a middleware
router.get('/listStudent/:t_id', validateToken, studentController.listStudent );
router.delete('/delStudent/:u_id', validateToken, studentController.delStudent);


module.exports = router;
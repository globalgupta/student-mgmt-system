const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/jwt-validator');
const teacherController = require('../controllers/teacher_controllers');
const fs = require('fs');
var multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var path = "./public/images/"
        //Create folder if does not exist
        fs.mkdirSync(path, { recursive: true })
        cb(null, path, function (err, succ) {
            if (err) b  
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



router.post('/addTeacher', validateToken, upload.any(), teacherController.addTeacher);
router.get('/listTeacher', validateToken, teacherController.listTeacher);
router.delete('/delTeacher/:u_id', validateToken, teacherController.delTeacher);
router.post('/updateTeacher/:id', validateToken, teacherController.updateTeacher);


module.exports = router;
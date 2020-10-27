/*
 //* Load Model * /
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const Student = mongoose.model('Comment_Section');
const Upload = mongoose.model('Photo_Upload');
const only = require('only');


exports.view_result = function (req, res) {

    Student.list(function (comments) {
        res.render('view_result', {
            comments: comments
        });
    });

};
exports.show_result = function (req, res) {

    Student.load(req.params.id, function (comment) {
        res.render('show_result', {
            comment: comment
        });
    });

};



exports.create = function (req, res) {

    res.render('create_photo');
};


 exports.store = function (req, res) {


    const student = new Student(only(req.body, 'comments group_number'));

    student.save(function (err, result) {

        if (err) {
          
          res.sendStatus(400)
        }


        if (req.files.length > 0) {

           console.log("Has file");
/// * Check all files * /
            req.files.forEach(function (file) {
                const upload = new Upload({
                    relatedId: result,
                    type: "student",
                    filename: file.filename,
                    originalname: file.originalname,
                    type: file.mimetype,
                    size: file.size,
                });

    
                upload.save(function (err, result) {
                    student.photo = result;
                    student.save();
                });

            });


        }
        res.redirect('/');

    });
};


*/

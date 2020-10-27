const express = require('express');
const router = express.Router();
const session = require("express-session");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const Teacher = require('../models/Teacher');
 //* Load Model * /
const mongoose = require('mongoose');
const Students = require('../models/User');
const Comment = mongoose.model('Comment_Section');
const Upload = mongoose.model('Photo_Upload');
const only = require('only');
const uploadStorage = require('../routers/storage');


// Login Page
router.get('/teacher_login/id12345', notTeacherLoggedIn, (req, res) => res.render('teacher_login'));

// Register Page
router.get('/teacher_register', (req, res) => res.render('teacher_register', {teacher: req.user.teacher}));

// Register
router.post('/teacher_register', (req, res) => {
    var teacher = req.body.teacher;
    var surname = req.body.teacher_surname;
    var name = req.body.teacher_name;
    var teacher_id = req.body.teacher_id;
    var password = req.body.teacher_password;
    var confirm_password = req.body.teacher_confirm_password;
  
    
    let errors = [];

  if (!teacher || !name || !password || !surname || !confirm_password) {
    errors.push({ msg: "Iltimos hamma blankani to'ldiring"});
  }


  if (password.length < 6) {
    errors.push({ msg: 'eng kamida 6 parol tering!' });
  }
  if(password != confirm_password)  {
      errors.push({msg: "takroriy parol noto'g'ri"});
  }
  if (errors.length > 0) {
    res.render('teacher_register', {
      errors,
        teacher,
        surname, 
      name,
        teacher_id,
      password,
    });
  } else {
    Teacher.findOne({ teacher_id: teacher_id }).then(user => {
      if (user) {
        errors.push({ msg: 'Bu Id allaqachon kiritilgan' });
        res.render('teacher_register', {
          errors,
            teacher,
            surname,
          name,
            teacher_id,
          password,
        });
      } else {
        const newUser = new Teacher({
            teacher, 
            surname,
          name,
            teacher_id,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect("/teachers/teacher_home_page");
              })
              
          });
        });
      }
    });
  }
});

// Login
router.post('/teacher_login', (req, res, next) => {
  passport.authenticate('local.teacher', {
    successRedirect: '/teachers/teacher_home_page',
    failureRedirect: '/teachers/teacher_login/id12345',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/teacher_logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/teachers/teacher_login/id12345');
});



router.get('/teacher_home_page', isTeacherLoggedIn, function(req, res) {
    res.render('teacher_home', {teacher: req.user.teacher});
});

function isTeacherLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/teachers/teacher_login/id12345');
}

function notTeacherLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/teachers/teacher_home_page');
}

//upload image function 


router.get("/create", isTeacherLoggedIn, function (req, res) {

    res.render('create_photo', {teacher: req.user.teacher});
});


router.post('/store', uploadStorage.any(), function (req, res) {


    const student = new Comment(only(req.body, 'comments group_number'));

    student.save(function (err, result) {

        if (err) {
          
            res.sendStatus(400)
        }


        if (req.files.length > 0) {

            console.log("Has file");
/ * Check all files * /
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
        res.redirect('/teachers/teacher_home_page',);

    });
});

router.get('/student_list', function(req, res) {
    
    Students.list(function(student_list){
        res.render('student_list', {student_list: student_list, teacher: req.user.teacher})
    })
})






module.exports = router;
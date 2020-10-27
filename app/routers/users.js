const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const session = require("express-session");
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const Student = require('../models/User');

 //* Load Model * /
const Comment = mongoose.model('Comment_Section');
const Upload = mongoose.model('Photo_Upload');
const only = require('only');
const fs = require('fs');
const join = require('path').join;
const models = join(__dirname, '../models');
const app =express();

fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));

router.get('/', isLoggedIn, function(req, res) {
    res.render('student_home', {student: req.user.student_name})
});
// Login Page
router.get('/student_login', notLoggedIn, (req, res) => res.render('login'));

// Register Page
router.get('/student_register',  (req, res) => res.render('register',  {teacher: req.user.teacher}));

// Register

router.post('/student_register', (req, res) => {
   var surname = req.body.student_surname;
    var student_name = req.body.student_name;
    var student_id = req.body.student_id;
    var password = req.body.student_password;
    var confirm_password = req.body.student_confirm_password;
    
  let errors = [];

  if (!student_name || !password || !surname || !student_id || !confirm_password ) {
    errors.push({ msg: "Iltimos hamma blankani to'ldiring!" });
  }
    
  if (password.length < 6) {
    errors.push({ msg: "eng kamida 6 parol tering!" });
  }
    
    if ( password != confirm_password) {
       errors.push({msg: "takroriy parol noto'g'ri"})
   }
    
    if (errors.length > 0) {
    res.render('register', {
      errors,
       surname, 
      student_name,
        student_id,
      password,
    teacher: req.user.teacher
    });
  } else {
    Student.findOne({ student_id: student_id }).then(user => {
      if (user) {
        errors.push({ msg: 'student ID allaqachon kiritilgan, ilmos boshqa id kiriting' });
        res.render('register', {
          errors,
         surname,
          student_name,
            student_id,
          password,
             teacher: req.user.teacher
        });
      } else {
        const newUser = new Student({
            surname,
          student_name,
            student_id,
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
                  "ro'yxatdan muafaqyatli o'tdingiz"
                );
                res.redirect("/teachers/teacher_home_page");
              });
          });
        });
      }
    });
  }
});

// Login
router.post('/student_login', (req, res, next) => {
    var student_id = req.body.student_id;
    var password = req.body.password;
     let errors = [];
    if(!student_id || !password) {
      errors.push({msg: "ID yoki parolni kiriting"})
    }
  passport.authenticate('local.student', {
    successRedirect: '/',
    failureRedirect: '/student_login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/student_logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/student_login');
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/student_login')
}
function notLoggedIn(req, res, next) {
    if(!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/student_home_page')
}

router.get('/view_result', function(req, res) {
    res.render('view_result', {student: req.user.student_name, teacher: req.user.teacher});
})

router.post("/view_result", isLoggedIn, function (req, res) {
     let errors = [];
    var search_text = req.body.search_data || req.query.search_data;
    if(search_text){

    Comment.find({comments: { $regex: search_text, $options: 'i', } }, function(err, comments) {
        if(err) {
      console.log(err);
            throw err;
           }
        res.render("view_result", {comments: comments, student: req.user.student_name, teacher: req.user.teacher})
    });
    } else {
        res.render("view_result");
    }
    
    /*Comment.list(function (comments) {
        res.render('view_result', {
            comments: comments, student: req.user.student_name, teacher: req.user.teacher});
    });*/
      
});

router.get("/show_result/:id", isLoggedIn, function (req, res) {

    Comment.load(req.params.id,function (comment) {
        res.render('show_result', {
            comment: comment, student: req.user.student_name, teacher: req.user.teacher});
    });
      
});




module.exports = router;
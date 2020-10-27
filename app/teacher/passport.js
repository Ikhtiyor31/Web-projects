const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Student = require('../models/User'); // student model
const Teacher = require('../models/Teacher'); // teacher model
//strategies 


module.exports = function(passport) {
  // this is for user authenticate teacher
    passport.use(['local.teacher'], new LocalStrategy({ usernameField: 'teacher_id' }, (teacher_id, password, done) => {
      // Match user
      Teacher.findOne({ teacher_id: teacher_id
      }).then(user => {
        if (!user) {
            console.log("foydalanuvchi nomi noto'g'ri ")
          return done(null, false, { message: "id yoki parol noto'g'ri!" });
        }

        // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
              console.log('password is incorrect');
            return done(null, false, { message: "parol noto'g'ri"});
          }
        
        });
      });
    })
  );

    
    // local.student strategy
    passport.use(['local.student'], new LocalStrategy({ usernameField: 'student_id' }, (student_id, password, done) => {
      // Match user
      Student.findOne({ student_id: student_id
      }).then(user => {
        if (!user) {
            console.log("foydalanuvchi nomi noto'g'ri ")
          return done(null, false, { message: "ID noto'g'ri" });
        }

        // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
              console.log('password is incorrect');
            return done(null, false, { message: "parol noto'g'ri " });
          }
        
        });
      });
    })
  );

    passport.serializeUser(function(user, done) {
        Teacher.findOne( { teacher_id: user.teacher_id }, function( err, teacher ) {
         if ( teacher ) {
              // user is teacher
              done( null, user.id );
        console.log('serializing teacher')
         } else {
             Student.findOne({student_id: user.student_id}, function(err, student) {
                
                 if(student) {
                     done(null, user.id);
                     console.log('serializing student');
                 }
             });
         }
        });
});

passport.deserializeUser(function(id, done) {
    Teacher.findById(id, function(err, user) {
        if(err) done(err);
        if(user) {
            console.log('deserializing teacher');
            done(null, user);
                  
                 } else {
                     Student.findById(id, function(err, student_user) {
                         if(err) done(err);
                         if(student_user) {
                             console.log('desearlizing student');
                             done(null, student_user);
                                          }
                     });
                 }
    });    
});
};
console.log('passport is defined');
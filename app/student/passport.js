const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Student = require('../models/User');
//strategies 


module.exports = function(passport) {
  // this is for user authenticate users 
    passport.use(['local.student'], new LocalStrategy({ usernameField: 'name' }, (name, password, done) => {
      // Match user
      Student.findOne({ name: name
      }).then(user => {
        if (!user) {
            console.log("foydalanuvchi nomi noto'g'ri ")
          return done(null, false, { message: "bu nome ro'yxatdan o'tmagan! " });
        }

        // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
              console.log('password is incorrect');
            return done(null, false, { message: 'Password incorrect' });
          }
        
        });
      });
    })
  );

    passport.serializeUser(function(user, done) {
         Student.findOne( { name: user.name }, function( err, student ) {
         if ( student ) {
              // user is student
        console.log('serializing user')
  done(null, user.id);
         }
         });
});

passport.deserializeUser(function(id, cb) {
    
  Student.findById(id, function(err, user) {
      console.log('deserializing user now ');
    cb(err, user);
  });
});
  
  ///passport.use(new LocalStrategy({usernameField: 'admin_name'}, (admin_name, password, done)=> {
      
//  }); //passport.use new localstrategy enging here ..... 
};
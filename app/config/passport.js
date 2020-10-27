const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
//strategies 


module.exports = function(passport) {
  // this is for user authenticate users 
    passport.use(new LocalStrategy({ usernameField: 'name' }, (name, password, done) => {
      // Match user
      User.findOne({ name: name
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

    passport.serializeUser(function(user, cb) {
        console.log('serializing user')
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    
  User.findById(id, function(err, user) {
      console.log('deserializing user now ');
    cb(err, user);
  });
});
  
  ///passport.use(new LocalStrategy({usernameField: 'admin_name'}, (admin_name, password, done)=> {
      
//  }); //passport.use new localstrategy enging here ..... 
};
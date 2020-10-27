const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');


module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'admin_name' }, (admin_name, admin_password, done) => {
      // Match user
      Admin.findOne({admin_name: admin_name
      }).then(user => {
        if (!user) {
            console.log("ism noto'g'ri ")
          return done(null, false, { message: 'foydalanuvchi ismi mavjud emas' });
        }

        // Match password
          bcrypt.compareSync(admin_password, user.admin_password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
              console.log("parol noto'g'ri");
            return done(null, false, { message: "Parol noto'g'ri" });
          }
        
        });
      });
    })
  );

    passport.serializeUser(function(user, cb) {
        console.log('serializing foydaluchi')
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    
  Admin.findById(id, function(err, user) {
      console.log('deserializing foydalanuvchi');
    cb(err, user);
  });
});
  
};
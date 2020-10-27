const express = require('express');
const http = require('http');
const path = require('path');
const hbsbar = require('express-handlebars');
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
const expressErrorHandler = require('express-error-handler');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const join = require('path').join;
const models = join(__dirname, 'app/models');

fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));



require('./app/teacher/passport')(passport);

mongoose.connect("mongodb://Ikhtiyor:zfgghbh1995@ds213538.mlab.com:13538/todo", {newUrlencoded: true}, function(err) {
   if(err) {
       console.log('error with database ');
   }
    else {
        console.log("database connection success");
    }
});
  

app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', '.hbs');
// view engine setup

app.engine('hbs', hbsbar({    extname: '.hbs', 
        partialsDir: __dirname + '/app/views/partials', 
        defaultLayout: __dirname + '/app/views/layouts/layout.hbs',
        layoutsDir: __dirname + '/app/views/layouts'
	})); 
app.use(express.static(path.join(__dirname, 'public')));


app.use(cookieParser());
app.use(session({
  secret: 'mysupersecret', 
  resave: false, 
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 180 * 60 * 1000 }
}));
// Passport init
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


app.use(function(req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    res.locals.user = req.user || null;
    
    next();
});

app.use('/', require('./app/routers/users'));


app.use('/teachers', require('./app/routers/teachers'));




var errorHandler = new expressErrorHandler({
    static: {
        '404':'./public/404.html'
    }
})

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

app.listen(3000, function() {
    console.log('app is running on port 3000');
})
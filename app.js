const express = require('express');
const http = require('http');
const path = require('path');
const hbsbar = require('express-handlebars');
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const i18n = require('i18n');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
const expressErrorHandler = require('express-error-handler');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



require('./app/config/passport')(passport);

//database connections 
const keys = require('./app/config/keys');

mongoose.connect(keys.Database, {newUrlencoded: true}, function(err) {
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
        helpers: require('./app/helpers/handlebars.js').helpers,
        partialsDir: __dirname + '/app/views/partials', 
        defaultLayout: __dirname + '/app/views/layouts/layout.hbs',
        layoutsDir: __dirname + '/app/views/layouts'
	})); 
app.use(express.static(path.join(__dirname, 'public')));

i18n.configure({
    locales: ['ru', 'uz'],
    register: global,
    fallback: {'uz': 'ru'},
    cookie: 'language',
    queryParameter: 'lang',
    defualtLocale: 'uz',
    directory: __dirname + '/app/languages',
    directoryPermission: '755',
    autoReload: true,
    updateFiles: false,
    syncFiles: false,
    indent: "\t",
    api: {
        '__':'__',
        '__n':'__n'
    }
});

app.use(function(req, res, next) {
    i18n.init(req, res, next);
});

app.use(function(req, res, next) {
    res.locals.clanguage = req.getLocale();
    res.locals.language = i18n.getLocales();
    next();
})

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
require('./app/routers/index')(app);
app.use('/', require('./app/routers/routes'));
app.get('/home', (req, res)=> {
    res.render('home');
});


var errorHanlder = new expressErrorHandler({
    static : {
        '404': './public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHanlder);
http.createServer(app).listen(4000, function() {
    console.log('app is listening port 4000');
});
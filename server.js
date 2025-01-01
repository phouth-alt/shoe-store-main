require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const { PORT } = process.env;

// Passport config
require('./config/passport')(passport);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	store: new (require('express-sessions'))({
		storage: 'mongodb',
		instance: mongoose, // optional
		host: 'localhost', // optional
		port: 27017, // optional
		db: 'test', // optional
		collection: 'sessions', // optional
		expire: 86400 // optional
	}),
	secret: 'secret',
	cookie: { maxAge: 60000 },
	resave: false,
	saveUninitialized: true
}));
	app.use(passport.initialize());
	// Flash messages middleware
	app.use((req, res, next) => {
		res.locals.success_msg = req.flash('success_msg');
		res.locals.error_msg = req.flash('error_msg');
		res.locals.error = req.flash('error');
		next();
	});
	app.use(passport.session());
	app.use(flash());
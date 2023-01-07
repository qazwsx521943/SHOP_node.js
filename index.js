const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

const session = require('express-session');

const MysqlStore = require('express-mysql-session')(session);

const db = require('./util/database');
// Store session in MySQL
const sessionStore = new MysqlStore({}, db);




const app = express();

// routes import
const adminRoutes = require('./routes/user');
const shopRoutes = require('./routes/shop');


// register EJS template
app.set('view engine','ejs');



// middleware start
// middleware for parsing forms
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:'mysecret', // for production this should be an encrypted string
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    // cookie:{maxAge:1_000_000}
}));

app.use((req,res, next) => {
    res.locals.isLoggedIn = req.session.loggedIn;
    next();
})

// routes middleware
app.use(adminRoutes);
app.use(shopRoutes);



// catch 404 error Page
app.use((req, res, next) => {
    res.status(404).render('404',{
        title:'404',
        isLoggedIn: req.session.loggedIn,
    });
})

app.listen(3005, (req,res) => {
    console.log('connected!');
});
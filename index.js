const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

const session = require('express-session');

const db = require('./util/database');

const app = express();

// routes import
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


// register EJS template
app.set('view engine','ejs');



// middleware start
// middleware for parsing forms
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.unsubscribe(session({
    secret:'mysecret', // for production this should be an encrypted string
    resave: false,
    saveUninitialized: false,
    // cookie:{maxAge:1_000_000}
}))

// routes middleware
app.use( '/admin', adminRoutes);
app.use(shopRoutes);

app.use('/temp', (req,res) => {
    res.render('temp');
})


// catch 404 error Page
app.use((req, res, next) => {
    res.status(404).render('404',{
        title:'404'
    });
})

app.listen(3005, (req,res) => {
    console.log('connected!');
});
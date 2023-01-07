const bcrypt = require('bcryptjs');

const nodemailer = require('nodemailer');

const User = require('../models/user');

const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
          user: 'qazwsx5219430630@gmail.com', // generated ethereal user
          pass: 'zavybkktpuybjoxx', // generated ethereal password
        },
      }
);




exports.getAddUser = (req, res, next) => {
    res.render('add-user',{
        title: 'addUser',
    });
}

// user sign up form (Auth)
exports.postAddUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    User.findByEmail(email)
    .then(([userData]) => {
        if(!userData) {
            console.log(userData);
            return res.redirect('/add-user');
        }

    return bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new User(null, email, hashedPassword, name);
            return user.save();
        });
    })
    .then(result => {
        res.redirect('/login');
        return transporter.sendMail({
            from: 'qazwsx5219430630@gmail.com',
            to:email,
            subject: 'SignUp Confirm',
            html: '<h1>You successfully signed up!</h1>'
        })
        .catch(err=> console.log(err));
    })
    .catch(err=>console.log(err));
    
}

exports.getLogin = (req,res,next) => {
    res.render('login', {
        title:'login',
        isLoggedIn: false,
    });
}


exports.postLogin = (req,res,next) => {
    const userEmail = req.body.email;
    const password = req.body.password;
    User.findByEmail(userEmail)
    .then(([user,field]) => {
        console.log(user);
        if(!user[0]) {
            return res.redirect('/login');
        }

        bcrypt
        .compare(password, user[0].password)
        .then( doMatch => {
            if(doMatch){
                req.session.loggedIn = true;
                req.session.user = user[0];
                return req.session.save(err=>{
                    console.log(err);
                    res.redirect('/user');
                });
            }
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err)
        });
    })
    .catch(err=>{
        console.log(err);
        res.redirect('/login');
    });
}


exports.postLogout = (req,res, next) => {
    req.session.destroy((err)=> {
        console.log(err);
        res.redirect('/login');
    });
}

exports.getReset = (req, res, next) => {
    res.render('reset',{
        title: 'reset password',
    })
}
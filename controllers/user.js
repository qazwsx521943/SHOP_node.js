const User = require('../models/user');

exports.getAllUsers = (req, res, next) => {
    User.fetchAll()
    .then(([rows, fieldData]) => {
        console.log(rows);
        res.render('user-profile',{
            users: rows,
            title : 'userList',
        });
    })
    .catch(err=>{
        console.log(err);
    })
}


exports.getAddUser = (req, res, next) => {
    res.render('add-user',{title: 'addUser'});
}


exports.postAddUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const user = new User(null, email, password, name);
    user
    .save()
    .then(result => {
        res.redirect('/user-profile');
    })
    .catch(err => {
        console.log(err);
    })
    
    res.render('add-user',{title: 'Sign Up'})
}

exports.getUserDetail = (req, res, next) => {
    const userId = req.params.user_id;
    User.findById(userId)
    .then(([user])=>{
        console.log(user[0]);
        res.render('user-detail',{
            title:'userList',
            user:user[0],
        })
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.getLogin = (req,res,next) => {
    res.render('login', {
        title:'login',
    });
}
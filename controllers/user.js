const User = require('../models/user');

exports.getAllUsers = (req, res, next) => {
    User.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('user-profile',{
            users: rows,
            title : 'userList',

        });
    })
    .catch(err=>{
        console.log(err);
    })
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


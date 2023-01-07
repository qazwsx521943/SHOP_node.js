const db = require('../util/database');

module.exports = class Users{
    constructor(user_id, email, password, name){
        this.user_id = user_id;
        this.email = email;
        this.password = password;
        this.name = name;
    }

    // insert new user
    save() {
        const sql = "INSERT INTO user_profile (email, password, name) VALUES (?, ?, ?)";
        return db.execute(sql, [
            this.email,
            this.password,
            this.name
        ]);
    }

    // get all users
    static fetchAll(){
        const sql = "SELECT * FROM user_profile";
        return db.execute(sql);
    }

    static findById(id) {
        const sql = "SELECT * FROM user_profile WHERE user_profile.user_id = ?";
        return db.execute(sql, [id]);
    }

    static findByEmail(userEmail){
        const sql = "SELECT * FROM user_profile WHERE user_profile.email = ?";
        return db.query(sql, [userEmail]);
    }

}
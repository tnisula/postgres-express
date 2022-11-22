const db = require('../database');
const bcrypt = require('bcryptjs');

const saltRounds=10;
const user={
  getAll: function(callback) {
    return db.query('select * from user_table', callback);
  },
  getById: function(id, callback) {
    return db.query('select * from user_table where id_user=$1', [id], callback);
  },
  add: function(user, callback) {
    bcrypt.hash(user.password, saltRounds, function(err, hashedPassword) {
      return db.query('insert into user_table (username, password) values($1,$2)',
      [user.username, hashedPassword], callback);
    });
  },
  delete: function(id, callback) {
    return db.query('delete from user_table where id_user=$1', [id], callback);
  },
  update: function(id, user, callback) {
    bcrypt.hash(user.password, saltRounds, function(err, hashedPassword) {
      return db.query('update user_table set username=$1, password=$2 where id_user=$3',
      [user.username, hashedPassword, id], callback);
    });
  }

}
          
module.exports = user;
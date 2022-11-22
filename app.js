var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const basicAuth = require('express-basic-auth');
const db = require('./database');
const bcrypt = require('bcryptjs');


var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var bookRouter = require('./routes/book');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/book', bookRouter);
app.use(basicAuth( { authorizer: myAuthorizer, authorizeAsync:true, } ))
app.use('/user', userRouter);

function myAuthorizer(username, password,cb){

    console.log("-------------");
    console.log(username, password);
    console.log("-------------");
    db.query('SELECT password FROM user_table WHERE username = $1',[username], 
      function(dbError, dbResults, fields) {
        if(dbError){
              console.log(dbError)
              response.json(dbError);
        }
        else {
          if (dbResults.rows.length > 0) {
            bcrypt.compare(password,dbResults.rows[0].password, 
              function(err,res) {
                if(res) {
                  console.log("success");
                  return cb(null, true);
                }
                else {
                  console.log("wrong password");
                  return cb(null, false);
                }			
                response.end();
              }
            );
          }
          else{
            console.log("user does not exists");
            return cb(null, false);
          }
        }
      }
    );
  }

module.exports = app;

const db = require('../database');
const book = {
  getAll: function(callback) {
    // console.log("getAll funktiossa!");
    return db.query('select * from book_table order by id_book desc', callback);
  },
  getById: function(id_book, callback) {
    return db.query('select * from book_table where id_book=$1', [id_book], callback);
  },
  add: function(book, callback) {
    console.log(book);
    return db.query(
      'insert into book_table (name, author, isbn) values($1,$2,$3)',
      [book.name, book.author, book.isbn],
      callback
    );
  },
  delete: function(id_book, callback) {
    return db.query('delete from book_table where id_book=$1', [id_book], callback);
  },
  update: function(id_book, book, callback) {
    return db.query(
      'update book_table set name=$1,author=$2, isbn=$3 where id_book=$4',
      [book.name, book.author, book.isbn, id_book],
      callback
    );
  }
};
module.exports = book;
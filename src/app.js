const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const mysql = require('mysql');
const cors = require('cors');
const { schema } = require("../src/schemas/types");

const app = express();
app.use(cors())

const queryDB = (req, sql, args) => new Promise((resolve, reject) => {
    req.mysqlDb.query(sql, args, (err, rows) => {
        if (err)
            return reject(err);
        rows.changedRows || rows.affectedRows || rows.insertId ? resolve(true) : resolve(rows);
    });
});

const root = {
  getLogin: (args, req) => queryDB(req, "select * from usuarios where user=? and pass=? ", [args.user, args.pass, args]).then(data => data),// *
  getUsers: (args, req) => queryDB(req, "select * from usuarios").then(data => data),//trae a todos los usuarios *
  updateUserInfo: (args, req) => queryDB(req, "update usuarios SET ? where id =?", [args, args.id]).then(data => data), //actualiza datos *
  getProduct: (args, req) => queryDB(req, "select * from product where activo = '1'").then(data => data),//trae todos los productos *
  getProductDel: (args, req) => queryDB(req, "select * from product where activo = '0' ").then(data => data),//trae todos los productos borrados *
  insertProduct: (args, req) => queryDB(req, "insert into product set?", args).then(data => data),// iserta productos *

  deleteProduct: (args, req) => queryDB(req, "update product SET ? where id = ?", [args, args.id]).then(data => data),
};

app.use((req, res, next) => {
  req.mysqlDb = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'examen'
  });
  req.mysqlDb.connect();
  next();
});

const corsOptions = {
  origin: "*",
  credentials : true
}

app.use('/graphql', graphqlHTTP({
  cors: corsOptions,
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');
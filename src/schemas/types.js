const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const mysql = require('mysql');
const cors = require('cors');


const schema = buildSchema(`
  type User {
    id: String
    name: String
    direccion: String
    ciudad: String
    pais: String
    telefono: String
    email: String
    foto: String
    pass: String
    user: String
  }
  type Product {
    id: String
    name: String
    cantidad: String
    activo: String
  }
  type log {
    user: String
    pass: String
  }
  type Query {
    getUsers: [User],
    getProduct: [Product],
    getProductDel: [Product],
    getLogin(user: String, pass: String): [User]
  }
  type Mutation {
    updateUserInfo(
      id: Int
      name: String
      direccion: String
      ciudad: String
      pais: String
      telefono: String
      email: String
      foto: String
      pass: String
      user: String
    ) : Boolean
    insertProduct(
      name: String
      cantidad: String
      activo: String
    ) : Boolean
    deleteProduct(
      id: String, activo: String
      ): Boolean
  }
`);

exports.schema =  schema;
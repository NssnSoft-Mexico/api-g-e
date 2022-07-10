const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const mysql = require('mysql');
const cors = require('cors');


const schema = buildSchema(`
  type User {
    id: String
    nombre: String
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
    nombre: String
    cantidad: String
    activo: String
  }
  type Query {
    getUsers: [User],
    getProduct: [Product],
    getProductDel: [Product]
  }
  type Mutation {
    updateUserInfo(
      id: Int
      nombre: String
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
      nombre: String
      cantidad: String
      activo: String
    ) : Boolean
    deleteProduct(
      id: String, activo: String
      ): Boolean
  }
`);

exports.schema =  schema;
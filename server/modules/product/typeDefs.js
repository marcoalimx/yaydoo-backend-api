const { gql } = require("apollo-server-express");

const typeDefs = gql`
  input productInput {
    name: String!
    sku: String!
    quantity: Int!
    price: String!
    fk_user: Int!
  }

  # Mutations
  extend type Mutation {
    createProduct (input: productInput): response
    getProductsSeller (idSeller: Int ): response
  }
  
  # Queries
  extend type Query {
    getProducts: response
    getProductsAdmin: response
    getListProviders: response
  }
`;
module.exports = typeDefs;

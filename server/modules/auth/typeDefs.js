const { gql } = require("apollo-server-express");

const typeDefs = gql`
  input loginInput {
    email: String!
    password: String!
  }

  # Mutations
  extend type Mutation {
    login (input: loginInput): response
    register (input: loginInput): response
  }
`;
module.exports = typeDefs;

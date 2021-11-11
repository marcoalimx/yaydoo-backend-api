const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type response {
    statusCode: Int
    message: String
    error: String
    response: String
  }
`;
module.exports = typeDefs
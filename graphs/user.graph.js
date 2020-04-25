var configs = global.configs;
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var { user } = require('../controllers');


const rootValue = {
  getUser: user.getUser,
};

const schema = buildSchema(`
  type Query {
    getUser(userId: String!): User!
  }
  type User {
    userId: String,
    service: String,
    email: String,
    displayname: String,
    avatar: String,
  }
`);

module.exports = graphqlHTTP({
  schema,
  rootValue,
  graphiql: configs.db.GRAPHIQL,
});
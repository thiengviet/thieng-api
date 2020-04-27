var configs = global.configs;
var fs = require('fs');
var path = require('path');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var user = require('./user.resolvers');

// Read schemas
const typeDefs = fs.readFileSync(path.join(__dirname, "schema.graphql"), 'utf8');
const schema = buildSchema(`${typeDefs}`);

// Define resolvers
const rootValue = {
  getUser: user.getUser,
};

// Export module
module.exports = graphqlHTTP({
  schema,
  rootValue,
  graphiql: configs.db.GRAPHIQL,
});
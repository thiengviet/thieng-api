var configs = global.configs;

var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');


const rootValue = {
  name: ({ }, req) => {
    console.log(req.auth)
    return 'Tu Phan';
  },
  rate: () => {
    return Math.random();
  },
  ability: () => {
    return ['fly', 'swim']
  },
  rollDice: ({ numDice }) => {
    var output = [];
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * 6));
    }
    return output;
  }
};

const schema = buildSchema(`
  type Query {
    name: String,
    rate: Float,
    ability: [String!]
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

module.exports = graphqlHTTP({
  schema,
  rootValue,
  graphiql: configs.db.GRAPHIQL,
});
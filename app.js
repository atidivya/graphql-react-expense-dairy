const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');


const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type RootQuery {
            expenses: [String!]!
        }
        type RootMutation {
            createExpense(name: String): String
        }
        schema {
            query: RootQuery
            mutation:RootMutation
        }
    `),
    rootValue: {
        expenses: () => {
            return ['Romantic Cooking', 'Sailing'];
        },
        createExpense: (args) => {
            const expenseName = args.name;
            return expenseName;
        }
    },
    graphiql: true
}));

app.listen(9000, function(){
    console.log('Server up and running on port : https://localhost:9000');
});
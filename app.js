const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');


const app = express();

const expenses = [];

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type Expense {
            _id: ID!
            title: String!
            price: Float!
            date: String!
        }
        input ExpenseInput {
            title: String!
            price: Float!
            date: String!
        }
        type RootQuery {
            expenses: [Expense!]!
        }
        type RootMutation {
            createExpense(expenseInput: ExpenseInput): Expense
        }
        schema {
            query: RootQuery
            mutation:RootMutation
        }
    `),
    rootValue: {
        expenses: () => {
            return expenses;
        },
        createExpense: (args) => {
            const expense = {
                _id : Math.random().toString(),
                title: args.expenseInput.title,
                price: +args.expenseInput.price,
                date: args.expenseInput.date
            };
            expenses.push(expense);
            return expense;
        }
    },
    graphiql: true
}));

app.listen(9000, function(){
    console.log('Server up and running on port : https://localhost:9000');
});